import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\Posts\Pages\ViewPost::__invoke
 * @see app/Filament/Resources/Posts/Pages/ViewPost.php:7
 * @route '/admin/posts/{record}'
 */
const ViewPost = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ViewPost.url(args, options),
    method: 'get',
})

ViewPost.definition = {
    methods: ["get","head"],
    url: '/admin/posts/{record}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Posts\Pages\ViewPost::__invoke
 * @see app/Filament/Resources/Posts/Pages/ViewPost.php:7
 * @route '/admin/posts/{record}'
 */
ViewPost.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { record: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    record: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        record: args.record,
                }

    return ViewPost.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Filament\Resources\Posts\Pages\ViewPost::__invoke
 * @see app/Filament/Resources/Posts/Pages/ViewPost.php:7
 * @route '/admin/posts/{record}'
 */
ViewPost.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ViewPost.url(args, options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\Posts\Pages\ViewPost::__invoke
 * @see app/Filament/Resources/Posts/Pages/ViewPost.php:7
 * @route '/admin/posts/{record}'
 */
ViewPost.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ViewPost.url(args, options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\Posts\Pages\ViewPost::__invoke
 * @see app/Filament/Resources/Posts/Pages/ViewPost.php:7
 * @route '/admin/posts/{record}'
 */
    const ViewPostForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ViewPost.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\Posts\Pages\ViewPost::__invoke
 * @see app/Filament/Resources/Posts/Pages/ViewPost.php:7
 * @route '/admin/posts/{record}'
 */
        ViewPostForm.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ViewPost.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\Posts\Pages\ViewPost::__invoke
 * @see app/Filament/Resources/Posts/Pages/ViewPost.php:7
 * @route '/admin/posts/{record}'
 */
        ViewPostForm.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ViewPost.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ViewPost.form = ViewPostForm
export default ViewPost