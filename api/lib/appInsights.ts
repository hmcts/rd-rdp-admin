import * as applicationInsights from 'applicationinsights'
import * as express from 'express'
import {getConfigValue, showFeature} from '../configuration'
import {APP_INSIGHTS_KEY, FEATURE_APP_INSIGHTS_ENABLED} from '../configuration/references'

export let client

if (showFeature(FEATURE_APP_INSIGHTS_ENABLED)) {
    applicationInsights
        .setup(getConfigValue(APP_INSIGHTS_KEY))
        .setAutoDependencyCorrelation(true)
        .setAutoCollectRequests(true)
        .setAutoCollectPerformance(true)
        .setAutoCollectExceptions(true)
        .setAutoCollectDependencies(true)
        .setAutoCollectConsole(true)
        .setSendLiveMetrics(true)
        .setUseDiskRetryCaching(true)
        .setSendLiveMetrics(true)
        .start()

    client = applicationInsights.defaultClient
    client.context.tags[client.context.keys.cloudRole] = 'xui-ao'
    client.trackTrace({ message: 'App Insight Activated' })

} else {
    client = null
}

export function appInsights(req: express.Request, res: express.Response, next) {
    if (client) {
        client.trackNodeHttpRequest({ request: req, response: res })
    }

    next()
}
