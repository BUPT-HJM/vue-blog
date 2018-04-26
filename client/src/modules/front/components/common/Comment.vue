<template>
    <div class="comment-box">
        <div id="disqus_thread"></div>
    </div>
</template>

<script>
export default {
    name: 'comment-box',
    data() {
        return {
        };
    },
    props: {
        sourceId: {
            type: String,
            required: true,
        },
    },
    mounted() {
        if (typeof DISQUS !== 'undefined') {
            DISQUS.reset({
                reload: true,
                config: function () {
                    this.page.identifier = this.sourceId;
                    this.page.url = location.href;
                },
            });
        }
    },
};
</script>

<style lang="stylus" scoped>
  .comment-box
    min-height 80px
    margin-bottom 20px
</style>
