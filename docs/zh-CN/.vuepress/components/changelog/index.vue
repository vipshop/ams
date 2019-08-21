<template>
    <el-timeline>
        <el-timeline-item v-for="(item, index) in logs" :key="index" :timestamp="item.date" placement="top">
            <el-card>
                <h4>{{ item.version }}</h4>
                <ul v-if="item.log" class="text item">
                    <li v-for="(log, i) in item.log" :key="i">
                        {{ log }}
                    </li>
                </ul>
            </el-card>
        </el-timeline-item>
    </el-timeline>
</template>

<script>
import '../entry'
import logs from './logs.js'
export default {
    data() {
        return {
            logs: logs
        }
    }
}
</script>

