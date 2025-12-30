<template>
  <div class="app-container">
    <el-card shadow="never" v-loading="loading" :element-loading-text="'加载中...'">
      <span class="notice-tip">注意：会员用户使用系统默认接口</span>
      <el-form class="settingForm" ref="settingForm" :model="setting" label-position="top" :rules="rules">
        <el-form-item label="Base Url" prop="api_url" required>
          <el-input v-model="setting.api_url" placeholder="https://api.ezworkapi.top/v1" />
        </el-form-item>
        <el-form-item label="API Key" prop="api_key" required>
          <el-input v-model="setting.api_key" placeholder="sk-******" />
        </el-form-item>
        <el-form-item label="模型列表" prop="models" required>
          <el-input
            type="textarea"
            resize="none"
            :rows="3"
            v-model="setting.models"
            @blur="changeModel"
            placeholder="请至少输入1个模型，多个模型用英文逗号,隔开"
          />
        </el-form-item>
        <el-form-item label="默认模型">
          <el-select v-model="setting.default_model" placeholder="未选择默认模型将采用配置中的第1个" clearable>
            <el-option v-for="model in models" :key="model" :label="model" :value="model" />
          </el-select>
        </el-form-item>
        <el-form-item label="默认备用模型">
          <el-select v-model="setting.default_backup" placeholder="未选择默认备用模型将采用配置中的第1个" clearable>
            <el-option
              v-for="model in models"
              :key="model"
              :disabled="setting.default_model == model ? true : false"
              :label="model"
              :value="model"
            />
          </el-select>
        </el-form-item>
        <el-form-item class="setting-btns">
          <el-button style="width: 88px" type="primary" @click="onSubmit(settingForm)">保存</el-button>
          <el-button type="primary" plain @click="openTestDialog">模型测试</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 模型测试弹窗 -->
    <el-dialog
      title="模型测试"
      v-model="testDialogVisible"
      width="600px"
      :close-on-click-modal="false"
      align-center
      top="1vh"
    >
      <el-form :model="testForm" label-position="top">
        <el-form-item label="选择模型">
          <el-select v-model="testForm.selectedModel" placeholder="请选择测试模型" style="width: 100%">
            <el-option v-for="model in models" :key="model" :label="model" :value="model" />
          </el-select>
        </el-form-item>
        <el-form-item label="测试消息">
          <el-input v-model="testForm.message" type="textarea" :rows="3" placeholder="请输入测试消息" />
        </el-form-item>
        <el-form-item>
          <template #label>
            <div class="result-label">
              <span>测试结果</span>
              <div class="metrics-container" v-if="metrics">
                <span class="metric-item">
                  <span class="metric-label">响应:</span>
                  <span class="metric-value">{{ metrics.responseTime }}ms</span>
                </span>
                <span class="metric-item">
                  <span class="metric-label">首字:</span>
                  <span class="metric-value">{{ metrics.firstTokenTime }}ms</span>
                </span>
                <span class="metric-item">
                  <span class="metric-label">耗时:</span>
                  <span class="metric-value">{{ metrics.duration }}ms</span>
                </span>
                <span class="metric-item">
                  <span class="metric-label">速度:</span>
                  <span class="metric-value">{{ metrics.tokensPerSecond }} tokens/s</span>
                </span>
              </div>
            </div>
          </template>
          <div class="test-result-container test-result-content1">{{ testResult }}</div>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="testDialogVisible = false">关闭</el-button>
          <el-button type="primary" @click="testModel" :loading="testLoading">测试</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { ElMessage } from "element-plus"
import { getApiSettingData, setApiSettingData } from "@/api/setting"

defineOptions({
  name: "接口配置"
})

const loading = ref(false)
const setting = ref({
  api_url: "",
  api_key: "",
  models: "",
  default_model: "",
  default_backup: ""
})

const models = ref([])
const settingForm = ref(null)

const rules = {
  api_url: [{ required: true, message: "请填写api接口地址", trigger: "blur" }],
  api_key: [{ required: true, message: "请填写API Key", trigger: "blur" }],
  models: [{ required: true, message: "请填写模型列表配置", trigger: "blur" }]
}

// 测试相关
const testDialogVisible = ref(false)
const testLoading = ref(false)
const testResult = ref("")
const testForm = ref({
  selectedModel: "",
  message: "Hello, 你好"
})
const metrics = ref(null)

onMounted(async () => {
  loading.value = true
  await getApiSettingData().then((data) => {
    if (data.data) {
      setting.value = data.data
      const arr = data.data.models.split(",")
      models.value = arr.filter((item) => item != "")
    }
  })
  loading.value = false
})

function changeModel() {
  if (!setting.value.models) return
  const arr = setting.value.models.split(",")
  models.value = arr.filter((item) => item != "")
  if (arr.indexOf(setting.value.default_model) == -1) {
    setting.value.default_model = ""
  }
  if (arr.indexOf(setting.value.default_backup) == -1) {
    setting.value.default_backup = ""
  }
}

function onSubmit(form) {
  console.log(setting.value)

  form.validate((valid, messages) => {
    console.log(valid)
    console.log(messages)
    if (valid) {
      setApiSettingData({
        api_url: setting.value.api_url,
        api_key: setting.value.api_key,
        models: setting.value.models,
        default_model: setting.value.default_model,
        default_backup: setting.value.default_backup
      })
        .then((data) => {
          if (data.code == 200) {
            ElMessage.success("保存成功")
          } else {
            ElMessage.error(data.message)
          }
        })
        .catch((e) => {
          ElMessage.error(e)
        })
    } else {
      for (const field in messages) {
        messages[field].forEach((message) => {
          ElMessage({
            message: message["message"],
            type: "error"
          })
        })
        break
      }
    }
  })
}

function openTestDialog() {
  testDialogVisible.value = true
  testResult.value = ""
  metrics.value = null
  // 默认选中第一个模型
  if (models.value.length > 0 && !testForm.value.selectedModel) {
    testForm.value.selectedModel = models.value[0]
  }
}

function testModel() {
  if (!testForm.value.selectedModel) {
    ElMessage.warning("请选择测试模型")
    return
  }
  if (!testForm.value.message.trim()) {
    ElMessage.warning("请输入测试消息")
    return
  }

  testLoading.value = true
  testResult.value = ""
  metrics.value = null

  const model = testForm.value.selectedModel
  const message = testForm.value.message

  // 构造OpenAI格式的请求
  const requestBody = {
    model: model,
    messages: [{ role: "user", content: message }],
    stream: true
  }

  // 记录时间戳
  const timestamps = {
    start: performance.now(),
    response: null,      // 接口响应时间（收到HTTP头）
    firstToken: null,    // 首个token时间
    end: null           // 完成时间
  }

  // Token统计
  let inputTokens = 0
  let outputTokens = 0
  let reasoningTokens = 0 // 思考模型的推理tokens
  
  // 思考内容标记
  let hasReasoning = false
  let reasoningContent = ""
  let finalContent = ""

  const startTime = performance.now()

  fetch(setting.value.api_url + "/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${setting.value.api_key}`
    },
    body: JSON.stringify(requestBody)
  })
    .then((response) => {
      // 记录接口响应时间（fetch Promise resolve时）
      timestamps.response = performance.now()
      
      if (!response.ok) {
        // 如果响应不成功，读取响应体获取错误信息
        return response.text().then((errorText) => {
          testLoading.value = false
          let errorMessage = `HTTP ${response.status}`
          try {
            // 尝试解析JSON错误响应
            const errorJson = JSON.parse(errorText)
            if (errorJson.error && errorJson.error.message) {
              errorMessage = errorJson.error.message
            } else {
              errorMessage = errorText
            }
          } catch (e) {
            // 如果不是JSON格式，直接使用文本
            errorMessage = errorText
          }
          testResult.value = `测试失败: ${errorMessage}`
          ElMessage.error(`测试失败: ${errorMessage}`)
          throw new Error(errorMessage)
        })
      }

      // 如果响应成功，开始处理流式数据
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ""

      function read() {
        reader
          .read()
          .then(({ done, value }) => {
            if (done) {
              timestamps.end = performance.now()
              testLoading.value = false
              calculateMetrics()
              ElMessage.success("测试完成")
              return
            }

            buffer += decoder.decode(value, { stream: true })
            const lines = buffer.split("\n")
            buffer = lines.pop() || ""

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6)
                if (data === "[DONE]") {
                  timestamps.end = performance.now()
                  testLoading.value = false
                  calculateMetrics()
                  ElMessage.success("测试完成")
                  return
                }

                try {
                  const parsed = JSON.parse(data)
                  
                  // 处理token统计
                  if (parsed.usage) {
                    if (parsed.usage.prompt_tokens) inputTokens = parsed.usage.prompt_tokens
                    if (parsed.usage.completion_tokens) outputTokens = parsed.usage.completion_tokens
                    // 支持思考模型的推理tokens
                    if (parsed.usage.reasoning_tokens) reasoningTokens = parsed.usage.reasoning_tokens
                  }
                  
                  const delta = parsed.choices?.[0]?.delta
                  if (delta) {
                    // 记录第一个token的时间（包括推理内容）
                    if (!timestamps.firstToken) {
                      timestamps.firstToken = performance.now()
                    }
                    
                    // 处理思考内容（reasoning_content）
                    if (delta.reasoning_content) {
                      hasReasoning = true
                      reasoningContent += delta.reasoning_content
                      // 如果有思考内容，先显示思考部分
                      testResult.value = `[思考过程]\n${reasoningContent}`
                    }
                    
                    // 处理最终回答内容（content）
                    if (delta.content) {
                      finalContent += delta.content
                      // 如果有思考内容，分开显示
                      if (hasReasoning) {
                        testResult.value = `[思考过程]\n${reasoningContent}\n\n[最终回答]\n${finalContent}`
                      } else {
                        testResult.value = finalContent
                      }
                    }
                  }
                } catch (e) {
                  console.error("解析数据错误:", e)
                }
              }
            }

            read()
          })
          .catch((error) => {
            testLoading.value = false
            // 在读取流过程中发生错误
            testResult.value = `流读取失败: ${error.message}`
            ElMessage.error(`流读取失败: ${error.message}`)
          })
      }

      read()
    })
    .catch((error) => {
      testLoading.value = false
      testResult.value = `测试失败: ${error.message}`
      console.error("请求错误:", error)
      ElMessage.error(`测试失败: ${error.message}`)
    })

  function calculateMetrics() {
    // 响应时间：从发送请求到收到HTTP响应头
    const responseTime = timestamps.response ? Math.round(timestamps.response - timestamps.start) : 0
    
    // 首字时间：从发送请求到收到第一个内容token
    const firstTokenTime = timestamps.firstToken ? Math.round(timestamps.firstToken - timestamps.start) : 0
    
    // 总耗时：从发送请求到完成
    const duration = timestamps.end ? Math.round(timestamps.end - timestamps.start) : 0
    
    // 总token数（包含输入、输出和推理）
    const totalTokens = inputTokens + outputTokens + reasoningTokens
    
    // tokens/s（每秒输出速度）
    const tokensPerSecond = duration > 0 ? Math.round((totalTokens / duration) * 1000) : 0

    metrics.value = {
      responseTime,
      firstTokenTime,
      duration,
      tokensPerSecond
    }
  }
}
</script>

<style lang="scss" scoped>
.settingForm {
  :deep(.el-form-item__content) {
    max-width: 480px;
    line-height: 1.2;
    justify-content: left;
  }
}
:deep(.el-form-item) {
  margin-bottom: 8px;
}

:deep(.el-form-item__content) {
  line-height: 1.2;
  justify-content: left;
}

.notice-tip {
  padding: 6px 12px;
  background: linear-gradient(135deg, #f0f9ff 0%, #e6f3ff 100%);
  border-left: 3px solid #409eff;
  border-radius: 4px;
  font-size: 13px;
  color: #606266;
  font-weight: 500;
  margin-bottom: 8px;
  animation: fadeIn 0.3s ease-in-out;
  display: inline-block;
}

.test-result-container {
  width: 100%;
  height: 100px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 8px;
  background-color: #f5f7fa;
  overflow: auto;
  font-family: monospace;
  font-size: 13px;
  line-height: 1.3;
  // color: #606266;
}

.result-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.metrics-container {
  display: flex;
  gap: 12px;
}

.metric-item {
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.metric-label {
  color: #909399;
  font-weight: 400;
}

.metric-value {
  color: #67c23a;
  font-weight: 600;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
