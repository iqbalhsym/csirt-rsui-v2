import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\DownloadController::rfc2350
 * @see app/Http/Controllers/DownloadController.php:11
 * @route '/download/rfc-2350'
 */
export const rfc2350 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: rfc2350.url(options),
    method: 'get',
})

rfc2350.definition = {
    methods: ["get","head"],
    url: '/download/rfc-2350',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DownloadController::rfc2350
 * @see app/Http/Controllers/DownloadController.php:11
 * @route '/download/rfc-2350'
 */
rfc2350.url = (options?: RouteQueryOptions) => {
    return rfc2350.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DownloadController::rfc2350
 * @see app/Http/Controllers/DownloadController.php:11
 * @route '/download/rfc-2350'
 */
rfc2350.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: rfc2350.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DownloadController::rfc2350
 * @see app/Http/Controllers/DownloadController.php:11
 * @route '/download/rfc-2350'
 */
rfc2350.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: rfc2350.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DownloadController::rfc2350
 * @see app/Http/Controllers/DownloadController.php:11
 * @route '/download/rfc-2350'
 */
    const rfc2350Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: rfc2350.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DownloadController::rfc2350
 * @see app/Http/Controllers/DownloadController.php:11
 * @route '/download/rfc-2350'
 */
        rfc2350Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: rfc2350.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DownloadController::rfc2350
 * @see app/Http/Controllers/DownloadController.php:11
 * @route '/download/rfc-2350'
 */
        rfc2350Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: rfc2350.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    rfc2350.form = rfc2350Form
/**
* @see \App\Http\Controllers\DownloadController::publicKey
 * @see app/Http/Controllers/DownloadController.php:28
 * @route '/download/public-key'
 */
export const publicKey = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publicKey.url(options),
    method: 'get',
})

publicKey.definition = {
    methods: ["get","head"],
    url: '/download/public-key',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DownloadController::publicKey
 * @see app/Http/Controllers/DownloadController.php:28
 * @route '/download/public-key'
 */
publicKey.url = (options?: RouteQueryOptions) => {
    return publicKey.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DownloadController::publicKey
 * @see app/Http/Controllers/DownloadController.php:28
 * @route '/download/public-key'
 */
publicKey.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publicKey.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DownloadController::publicKey
 * @see app/Http/Controllers/DownloadController.php:28
 * @route '/download/public-key'
 */
publicKey.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: publicKey.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DownloadController::publicKey
 * @see app/Http/Controllers/DownloadController.php:28
 * @route '/download/public-key'
 */
    const publicKeyForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: publicKey.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DownloadController::publicKey
 * @see app/Http/Controllers/DownloadController.php:28
 * @route '/download/public-key'
 */
        publicKeyForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: publicKey.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DownloadController::publicKey
 * @see app/Http/Controllers/DownloadController.php:28
 * @route '/download/public-key'
 */
        publicKeyForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: publicKey.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    publicKey.form = publicKeyForm
const download = {
    rfc2350: Object.assign(rfc2350, rfc2350),
publicKey: Object.assign(publicKey, publicKey),
}

export default download