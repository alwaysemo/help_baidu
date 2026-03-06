import { ref, onUnmounted } from 'vue'

/**
 * 基于时间切换文本的 Hook（优雅极简版）
 * @param {Array<{time: number, text: string}>} config - 时间-文本配置项
 * @returns {Ref<string>} 响应式文本
 */
export const useTimeBasedText = (config) => {
	const tipText = ref(config[0]?.text ?? '')
	let rafId = null
	const startTime = Date.now()
	const getCurrentText = () => {
		const elapsed = Date.now() - startTime
		const matched = config.find((item, index) => {
			const prevTime = index === 0 ? 0 : config[index - 1].time
			return elapsed > prevTime && elapsed <= item.time
		})
		return matched?.text ?? config.at(-1)?.text ?? ''
	}
	const updateText = () => {
		tipText.value = getCurrentText()
		if (Date.now() - startTime <= config.at(-1)?.time) {
			rafId = requestAnimationFrame(updateText)
		}
	}
	rafId = requestAnimationFrame(updateText)
	onUnmounted(() => rafId && cancelAnimationFrame(rafId))
	return tipText
}
