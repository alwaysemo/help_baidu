<script setup>
	import { ref, useTemplateRef, onMounted } from 'vue'
	import { useRoute } from 'vue-router'
	import { Modal } from '@hooks/modal'
	import { Message } from '@hooks/message'
	import { useTimeBasedText } from '@hooks/useTimeBasedText'
	import Pointer from '@components/Pointer.vue'
	import Cipboard from 'copy-to-clipboard'

	const route = useRoute()
	const inputRef = useTemplateRef('input')
	const buttonRef = useTemplateRef('button')
	const isStart = ref(false)
	const searchValue = ref('')
	const tipText = useTimeBasedText([
		{ time: 2500, text: '让我来教你怎么使用' },
		{ time: 4500, text: '输入搜索内容' },
		{ time: 6500, text: '然后点击“百度一下”' },
		{ time: 9000, text: '这不是很简单吗' },
	])

	onMounted(() => {
		if (route.query.query) {
			searchValue.value = decodeURIComponent(route.query.query)
			setTimeout(() => {
				isStart.value = true
			}, 2000)
		}
	})

	function onGenerate() {
		if (!searchValue.value) return Message.warning('请先输入搜索内容')
		Modal.confirm({
			title: '复制链接分享',
			content: `${window.location.href}?query=${encodeURIComponent(searchValue.value)}`,
			confirmText: '复制',
			onConfirm: () => {
				Cipboard(`${window.location.href}?query=${encodeURIComponent(searchValue.value)}`)
				Message.success('复制成功')
			},
		})
	}

	function onSearch() {
		setTimeout(() => {
			window.location.href = `https://www.baidu.com/s?wd=${route.query.query}`
		}, 2000)
	}
</script>

<template>
	<div class="always-container">
		<div class="flex items-center justify-between text-sm text-gray-900">
			<div class="mx-6 my-4 flex hidden items-center gap-6 md:flex md:gap-5 lg:flex lg:gap-5">
				<a class="hover:text-blue-500" href="https://news.baidu.com/" target="_blank">新闻</a>
				<a class="hover:text-blue-500" href="https://www.hao123.com/?src=from_pc_logon/" target="_blank">hao123</a>
				<a class="hover:text-blue-500" href="https://map.baidu.com/" target="_blank">地图</a>
				<a class="hover:text-blue-500" href="https://tieba.baidu.com/" target="_blank">贴吧</a>
				<a class="hover:text-blue-500" href="https://haokan.baidu.com/?sfrom=baidu-top" target="_blank">视频</a>
				<a class="hover:text-blue-500" href="https://image.baidu.com/" target="_blank">图片</a>
				<a class="hover:text-blue-500" href="https://pan.baidu.com/?from=1026962h/" target="_blank">网盘</a>
				<a class="hover:text-blue-500" href="https://wenku.baidu.com/?fr=bdpcindex" target="_blank">文库</a>
				<a class="hover:text-blue-500" href="https://www.baidu.com/" target="_blank">更多</a>
			</div>
			<div class="mx-6 my-4 flex items-center gap-6 md:gap-2.5 lg:gap-5">
				<a class="hover:text-blue-500" href="https://www.baidu.com/" target="_blank">设置</a>
				<button
					class="cursor-pointer rounded-md bg-[linear-gradient(136deg,#286aff,#4e6ef2,#7274f9,#9f66ff)] px-3 py-1 text-[white]"
				>
					登录
				</button>
			</div>
		</div>
		<div class="main-container mt-[20vh] px-[30px]">
			<img class="m-auto block max-w-[200px]" src="@assets/svg/baidu.svg" alt="baidu logo" srcset="" />
			<div
				class="mx-auto my-5 max-w-[800px] rounded-xl bg-[linear-gradient(136deg,#286aff,#4e6ef2,#7274f9,#9f66ff)] p-px shadow-[0_13px_18px_-15px_rgba(77,128,255,0.2)]"
			>
				<div class="grid h-full grid-cols-[1fr_110px] gap-2.5 overflow-hidden rounded-[10px] bg-[white] p-1.5">
					<textarea
						id="search-textarea"
						class="box-border h-[46px] min-w-[10px] cursor-auto resize-none border-[none] px-3 py-0 text-base leading-[46px] outline-none"
						v-model="searchValue"
						ref="input"
						autocomplete="off"
						rows="1"
						placeholder="让我帮你百度一下，你就知道"
					></textarea>
					<button
						class="cursor-pointer rounded-[10px] bg-[linear-gradient(136deg,#286aff,#4e6ef2,#7274f9,#9f66ff)] text-base font-medium text-[white] hover:bg-[linear-gradient(rgba(0,0,0,0.09),rgba(0,0,0,0.09)),linear-gradient(136deg,#286aff,#4e6ef2,#7274f9,#9f66ff)]"
						ref="button"
						@click="onGenerate"
					>
						百度一下
					</button>
				</div>
			</div>
			<div class="text-center text-gray-800" v-if="route.query.query">{{ tipText }}</div>
		</div>
		<div class="fixed bottom-0 left-0 w-full overflow-hidden px-5 pt-5 pb-[30px] text-center text-xs text-neutral-400">
			<div>
				<a class="mx-1 hover:text-gray-800" href="https://github.com/alwaysemo/help_baidu.git" target="_blank"
					>GitHub 开源地址</a
				>
				<a class="mx-1" href="javascript:">|</a>
				<a class="mx-1" href="javascript:" target="_blank">
					本站与百度Baidu没有任何联系，站内出现的所有内容包括但不限于商标、链接均为【百度公司】所属
				</a>
			</div>
			<div class="mt-2">
				<a class="mx-1 hover:text-gray-800" href="https://home.baidu.com/" target="_blank">关于百度</a>
				<a class="mx-1 hover:text-gray-800" href="https://ir.baidu.com/" target="_blank">About Baidu</a>
				<a class="mx-1 hover:text-gray-800" href="https://www.baidu.com/duty/" target="_blank">使用百度前必读</a>
				<a class="mx-1 hover:text-gray-800" href="https://help.baidu.com/question?prod_id=1" target="_blank">
					帮助中心
				</a>
				<a class="mx-1 hover:text-gray-800" href="https://e.baidu.com/?refer=1271" target="_blank">企业推广</a>
				<a
					class="mx-1 hover:text-gray-800"
					href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11000002000001"
					target="_blank"
				>
					京公网安备11000002000001号
				</a>
				<a class="mx-1 hover:text-gray-800" href="https://beian.miit.gov.cn/" target="_blank">京ICP证030173号</a>
				<a class="mx-1" href="javascript:" target="_blank">互联网新闻信息服务许可证11220180008</a>
				<a class="mx-1" href="javascript:" target="_blank">网络文化经营许可证： 京网文〔2023〕1034-029号</a>
				<a class="mx-1 hover:text-gray-800" href="https://www.baidu.com/licence/" target="_blank">
					信息网络传播视听节目许可证 0110516
				</a>
				<a class="mx-1" href="javascript:" target="_blank">互联网宗教信息服务许可证编号：京（2022）0000043</a>
			</div>
		</div>
		<Pointer v-if="isStart" :inputElement="inputRef" :buttonElement="buttonRef" @end="onSearch" />
	</div>
</template>

<style scoped lang="scss">
	/** */
</style>
