import pubsub, { EVENTS } from '../subscriptions/index.js';
import axios from 'axios'

export default {
    Query: {
        getBlog: (parent, { id }, { models }) => {
            return new Promise((resolve, reject) => {
                models.Blog.findById(id).populate([
                    { path: "createdBy", select: "id firstName lastName email" },
                    { path: "updatedBy", select: "id firstName lastName email" }
                ]).exec((err, res) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(res);
                })
            })
        },

        getBlogs: (parent, args, { models }) => {
            return new Promise((resolve, reject) => {
                models.Blog.find({ isDeleted: false }).populate([
                    { path: "createdBy", select: "id email" },
                    { path: "updatedBy", select: "id email" }
                ]).exec((err, res) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(res)
                })
            })
        },

        getAllBlogs: (parent, args, { models }) => {
            return new Promise((resolve, reject) => {
                let filter = JSON.parse(args.filter);

                Object.keys(filter).forEach(data => {
                    if (data == "name") {
                        filter[data] = { name: filter[data] }
                    }
                })
                models.Blog.paginate(
                    { ...filter, isDeleted: false },
                    {
                        page: args.page,
                        limit: args.limit,
                        populate: [
                            { path: "createdBy", select: "id email" },
                            { path: "updatedBy", select: "id email" }
                        ]
                    }
                ).then((res) => {
                    resolve({ count: res.totalDocs, data: res.docs })
                }).catch((err) => {
                    reject(err);
                })
            })
        },

        getPlans: (parent, args, { models, me }) => {
            return new Promise((resolve, reject) => {
                axios.get('https://payments.pabbly.com/api/v1/plans', {
                    headers: { Authorization: 'Basic NGI0ZGE4Y2E1YzAxYTYwNWJmMmQ6YmYyZGY2OGIwYTJmMWUzMzRiNWYyYmFlYWNiZDg4Njc=' }
                }).then((res) => {
                    if (args.plan_period) {
                        const getPlan = res.data.data.filter(plan => plan.billing_period === args.plan_period)
                        const getData = res.data.data.filter(plan => plan.billing_period == '')
                        const data = getPlan.concat(getData)
                        resolve(data)
                    }
                }).catch((e) => {
                    reject(e)
                })
            })
        }
    },
    Mutation: {
        createBlog: (parent, { input }, { models, me }) => {
            return new Promise((resolve, reject) => {
                const userId = me && me._id
                input['createdBy'] = userId;
                input['updatedBy'] = userId;

                models.Blog.create(input, (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        models.Blog.paginate({ _id: res._id },
                            {
                                populate: [
                                    { path: 'createdBy', select: "id email" },
                                    { path: 'updatedBy', select: "id email" }
                                ]
                            }).then((resp) => {
                                pubsub.publish(EVENTS.BLOG.BLOG_CREATED, {
                                blogChange : {keyType : 'INSERT', data : resp.docs[0]}
                            })
                        resolve(res);
                        })
                    }
                })
            })
        }
    },


    Subscription: {
        blogChange: {
            subscribe: () => pubsub.asyncIterator([EVENTS.BLOG.BLOG_CREATED, EVENTS.BLOG.BLOG_UPDATED, EVENTS.BLOG.BLOG_DELETED]),
        },
    },
}