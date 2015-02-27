/**
 * Created by julien.zhang on 2015/2/27.
 */

module.exports = {

    /**
     * filter定义中间件
     * @param before 可选 自定义全局前置过滤器
     * @param after  可选 自定义全局后置过滤器
     * @example
     *
     */
    filter:{
        before:[],
        after:['static', '404','500']
    },

    /**
     * mapping定义路由
     * @param url     必须 定义路由url
     * @param method  可选 定义请求方法，默认为all
     * @param action  必须 定义路由处理器
     * @param filter  可选 定义过滤器，值可以是一个对象或数组，数组的情况下，则表示前置过滤器
     * @example
     *
     *  {
     *       url:'/test',
     *       action:'test.test',
     *       filter:{
     *           before:['authorization']
     *       }
     *  }
     *  访问/test, 先由filter目录下authorization模块处理请求，授权通过后，接着由action目录下的test模块的test方法相应请求
     */
    mapping:[

        {
            url:'/',
            action:'index',
            //filter:[],
            filter:{
                before:[],
                after:[]
            }
        }



    ]


};