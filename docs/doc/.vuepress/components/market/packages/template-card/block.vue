<template>
    <div v-if="ready"
         :class="'ams-material-card ams-block-' + type "
         :style="block.style">

        <ams-blocks :blocks="block.slotBlocks.top" />

        <ams-operations :name="name"
                        slot-name="searchs" />

        <div class="card-class-list">
            <ul>
                <li v-for="(item, index) in block.options.classList"
                    :key="index"
                    :class="[index === activeIndex ? 'active': '']"
                    @click="handleClassChange(item, index)">{{ item.class }}</li>
            </ul>
        </div>

        <div class="ams-card-list">
            <div v-for="(item, index) in data.list"
                 :key="index"
                 class="card-item">
                <el-card :body-style="{ padding: '0px' }">

                    <div class="card-item-snapshoot">
                        <span v-if="newCompute(item.updateTime)"
                              class="new-card-icon">NEW</span>
                        <img :src="item.image || 'https://h5rsc.vipstatic.com/ams/ams-logo.png'"
                             alt="">
                    </div>

                    <div class="card-item-bottom">
                        <span class="title">{{ item.title }}</span>
                        <span class="time">{{ parseTime(item.updateTime) }}</span>
                    </div>

                    <div class="card-item-mask">
                        <h5>{{ item.title }}</h5>
                        <p>简介： {{ item.description }}</p>
                        <p>分类： {{ fields.classId.props.options[item.classId] }}</p>
                        <p>作者： {{ item.creator }}</p>
                        <el-row v-if="block.operations"
                                class="card-oparation">
                            <ams-operations :name="name"
                                            :context="item" />
                        </el-row>
                    </div>
                </el-card>
            </div>
        </div>

        <div v-if="data.list.length <= 0"
             class="empty">
            <div>暂无数据</div>
        </div>

        <el-pagination v-if="data.total"
                       :current-page.sync="data.page"
                       :page-size.sync="data.pageSize"
                       :total="data.total"
                       layout="prev, sizes, pager, next, jumper"
                       background
                       align="right"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange" />

        <ams-blocks :blocks="block.blocks" />
    </div>

</template>

<script>
/* eslint-disable vue/require-prop-types */
import ams from '@ams-team/ams'

export default {
    mixins: [ams.mixins.blockMixin],
    data() {
        return {
            type: 'template-card',
            filters: {},
            searchs: {},
            data: {
                // list: [],
                // total: 0,
                // page: 1,
                // pageSize: 20
            },
            sortField: null,
            sortOrder: null,
            activeIndex: 0
        }
    },
    computed: {
    },
    created() {
        console.log('---created---', this)
    },
    methods: {
        parseTime(time) {
            return ams.utils.parseTime(time, 'yyyy-MM-dd HH:mm')
        },
        newCompute(time) {
            // 30天的时间戳2592000000 更新时间30天内现实新的标识
            return Date.parse(new Date()) - time < 2592000000
        },
        handleClassChange(item, index) {
            this.activeIndex = index
            this.data.searchs = this.data.searchs || {}
            this.data.searchs.classId = item.id
            this.emitEvent('list')
        },
        handlerSearch() {
            console.log('handlerSearch', this.searchs)
            this.data.page = 1
            this.emitEvent('list')
        },
        handleSizeChange() {
            console.log('handleSizeChange')
            this.data.page = 1
            this.emitEvent('list')
        },
        handleCurrentChange(e) {
            console.log('handleCurrentChange')
            this.emitEvent('list')
        },
        handleSortChange({ prop, order }) {
            console.log('handleSortChange', prop, order)
            this.sortField = prop
            this.sortOrder = order
            this.data.page = 1
            this.emitEvent('list')
        },
        handleFilterChange(e) {
            console.log('handleFilterChange', e)
            // 远程筛选
            let remoteFilterChange = false
            Object.keys(e).forEach(key => {
                console.log(
                    'this.block.filters[key].remote',
                    this.block.filters[key].remote
                )
                if (this.block.filters[key].remote) {
                    remoteFilterChange = true
                    const filter = e[key].join(',')
                    if (filter) {
                        this.filters[key] = filter
                    } else {
                        delete this.filters[key]
                    }
                }
            })
            if (remoteFilterChange) {
                this.data.page = 1
                this.emitEvent('list')
            }
        }
    }
}
</script>
