import apollo from 'apollo-server'
const { PubSub } = apollo

import { USER_EVENTS, BLOG_EVENTS } from './events.js'

export const EVENTS = {
    USER: USER_EVENTS,
    BLOG: BLOG_EVENTS,
}

export default new PubSub()