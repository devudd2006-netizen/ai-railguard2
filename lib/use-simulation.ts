'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export type SensorStatus = 'safe' | 'warn' | 'danger'

export type SensorReading = {
  vibration: number
  strain: number
  temp: number
}

export type Sensor = {
  id: string
  label: string
  pos: number
  vibration: number
  strain: number
  temp: number
  status: SensorStatus
  history: SensorReading[]
}

export type AlertEntry = {
  id: string
  time: string
  level: 'info' | 'warn' | 'danger'
  message: string
}

export type SimState = {
  monitoring: boolean
  progress: number
  trainPos: number
  sensors: Sensor[]
  riskScore: number
  riskHistory: number[]
  trackHealth: number
  activeAlerts: number
  alerts: AlertEntry[]
  showPopup: boolean
  aiConfidence: number
  etaHours: number | null
}

const SENSOR_POS = [8, 24, 40, 57, 74, 91]
const HISTORY_LEN = 30
const RISK_HISTORY_LEN = 700

const PENDING_TIME = '--:--:--'

function deterministicSensors(): Sensor[] {
  const vib = [1.8, 1.7, 1.9, 1.8, 1.7, 1.9]
  const strain = [128, 132, 126, 130, 134, 129]
  const temp = [28, 29, 28, 30, 29, 28]
  return SENSOR_POS.map((pos, i) => ({
    id: `S${i + 1}`,
    label: `Node S${i + 1}`,
    pos,
    vibration: vib[i],
    strain: strain[i],
    temp: temp[i],
    status: 'safe' as SensorStatus,
    history: [{ vibration: vib[i], strain: strain[i], temp: temp[i] }],
  }))
}

function baseSensors(): Sensor[] {
  return SENSOR_POS.map((pos, i) => {
    const vibration = +(1.6 + Math.random() * 0.4).toFixed(1)
    const strain = 120 + Math.round(Math.random() * 20)
    const temp = 27 + Math.round(Math.random() * 3)
    return {
      id: `S${i + 1}`,
      label: `Node S${i + 1}`,
      pos,
      vibration,
      strain,
      temp,
      status: 'safe' as SensorStatus,
      history: [{ vibration, strain, temp }],
    }
  })
}

const INITIAL: SimState = {
  monitoring: false,
  progress: 0,
  trainPos: 0,
  sensors: deterministicSensors(),
  riskScore: 8,
  riskHistory: [8],
  trackHealth: 96,
  activeAlerts: 0,
  alerts: [
    { id: 'boot', time: PENDING_TIME, level: 'info', message: 'System initialized — all 6 nodes online' },
  ],
  showPopup: false,
  aiConfidence: 99,
  etaHours: null,
}

function nowLabel() {
  return new Date().toLocaleTimeString('en-US', { hour12: false })
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.max(0, Math.min(1, t))
}

export function useSimulation() {
  const [state, setState] = useState<SimState>(INITIAL)
  const raf = useRef<number | null>(null)
  const start = useRef<number>(0)
  const firedPopup = useRef(false)
  const faultIndex = useRef(3)
  const finalRisk = useRef(92)
  const DURATION = 11000

  const stop = useCallback(() => {
    if (raf.current) cancelAnimationFrame(raf.current)
    raf.current = null
  }, [])

  const reset = useCallback(() => {
    stop()
    firedPopup.current = false
    setState({
      ...INITIAL,
      sensors: baseSensors(),
      alerts: [{ id: 'reset', time: nowLabel(), level: 'info', message: 'Monitoring reset — nominal baseline restored' }],
    })
  }, [stop])

  const startMonitoring = useCallback(() => {
    stop()
    firedPopup.current = false
    faultIndex.current = Math.floor(Math.random() * SENSOR_POS.length)
    finalRisk.current = 70 + Math.floor(Math.random() * 29)
    start.current = performance.now()
    setState((s) => ({
      ...s,
      monitoring: true,
      progress: 0,
      trainPos: 0,
      riskScore: 8,
      riskHistory: [8],
      trackHealth: 96,
      activeAlerts: 0,
      showPopup: false,
      sensors: baseSensors(),
      etaHours: null,
      aiConfidence: 99,
      alerts: [
        { id: `run-${Date.now()}`, time: nowLabel(), level: 'info', message: 'Monitoring started — AI inference active on edge node' },
      ],
    }))

    const tick = (t: number) => {
      const elapsed = t - start.current
      const p = Math.min(elapsed / DURATION, 1)

      const fireNow = !firedPopup.current && p >= 0.62
      if (fireNow) firedPopup.current = true

      setState((s) => {
        const escalate = Math.max(0, (p - 0.35) / 0.4)
        const faultStatus: SensorStatus = p < 0.4 ? 'safe' : p < 0.62 ? 'warn' : 'danger'

        const sensors = s.sensors.map((sensor, i) => {
          let vibration: number
          let strain: number
          let temp: number
          let status: SensorStatus

          if (i === faultIndex.current) {
            vibration = +lerp(1.8, 9.4, escalate).toFixed(1)
            strain = Math.round(lerp(130, 640, escalate))
            temp = Math.round(lerp(28, 58, escalate))
            status = faultStatus
          } else {
            vibration = +(1.6 + Math.sin(elapsed / 700 + i) * 0.25 + 0.25).toFixed(1)
            strain = 120 + Math.round(Math.sin(elapsed / 900 + i) * 12) + 12
            temp = 27 + ((i + Math.round(elapsed / 4000)) % 3)
            status = 'safe'
          }

          const history = [...sensor.history, { vibration, strain, temp }].slice(-HISTORY_LEN)
          return { ...sensor, vibration, strain, temp, status, history }
        })

        const riskScore = Math.round(lerp(8, finalRisk.current, Math.max(0, (p - 0.35) / 0.45)))
        const riskHistory = [...s.riskHistory, riskScore].slice(-RISK_HISTORY_LEN)
        const trackHealth = Math.round(lerp(96, 41, Math.max(0, (p - 0.35) / 0.45)))
        const aiConfidence = Math.round(lerp(99, 97, p))
        let trainPos = p * 100

        if (riskScore >= 90) {
          trainPos = SENSOR_POS[faultIndex.current]
        }

        let alerts = s.alerts
        let showPopup = s.showPopup
        let activeAlerts = s.activeAlerts
        let etaHours = s.etaHours

        if (fireNow) {
          showPopup = true
          activeAlerts = 1
          if (riskScore >= 90) etaHours = 2
          else if (riskScore >= 70) etaHours = 4
          else if (riskScore >= 35) etaHours = 8
          else etaHours = 12

          const faultLabel = `S${faultIndex.current + 1}`
          alerts = [
            { id: `warn-${Date.now()}`, time: nowLabel(), level: 'warn', message: `Node ${faultLabel} crossed warning threshold — vibration rising` },
            { id: `danger-${Date.now() + 1}`, time: nowLabel(), level: 'danger', message: `CRITICAL: High vibration at ${faultLabel} — possible track failure` },
            ...s.alerts,
          ]
        }

        return {
          ...s,
          progress: p,
          trainPos,
          sensors,
          riskScore,
          riskHistory,
          trackHealth,
          aiConfidence,
          activeAlerts,
          alerts,
          showPopup,
          etaHours,
        }
      })

      if (p < 1) {
        raf.current = requestAnimationFrame(tick)
      } else {
        raf.current = null
      }
    }

    raf.current = requestAnimationFrame(tick)
  }, [stop])

  const dismissPopup = useCallback(() => {
    setState((s) => ({ ...s, showPopup: false }))
  }, [])

  useEffect(() => {
    setState((s) => {
      if (s.monitoring) return s
      return {
        ...s,
        sensors: baseSensors(),
        alerts: [{ id: 'boot', time: nowLabel(), level: 'info', message: 'System initialized — all 6 nodes online' }],
      }
    })
  }, [])

  useEffect(() => stop, [stop])

  return { state, startMonitoring, reset, dismissPopup }
}