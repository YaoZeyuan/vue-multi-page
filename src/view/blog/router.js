/**
 * Created by yaoze on 2016/9/26.
 */

// 组件只有import之后才能使用
import article_list from './components/list/article_list.vue'
import article from './components/detail/article.vue'

const routes =
    [
        {
            path: '/',
            component: article_list,
        },
        {
            path: '/article',
            // 只有设置了name才可以向组件中传递参数
            name: 'article',
            component: article,
        },
    ];
export default routes;
