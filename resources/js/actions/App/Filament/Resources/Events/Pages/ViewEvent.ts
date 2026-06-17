import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\Events\Pages\ViewEvent::__invoke
 * @see app/Filament/Resources/Events/Pages/ViewEvent.php:7
 * @route '/admin/events/{record}'
 */
const ViewEvent = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ViewEvent.url(args, options),
    method: 'get',
})

ViewEvent.definition = {
    methods: ["get","head"],
    url: '/admin/events/{record}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Events\Pages\ViewEvent::__invoke
 * @see app/Filament/Resources/Events/Pages/ViewEvent.php:7
 * @route '/admin/events/{record}'
 */
ViewEvent.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return ViewEvent.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Filament\Resources\Events\Pages\ViewEvent::__invoke
 * @see app/Filament/Resources/Events/Pages/ViewEvent.php:7
 * @route '/admin/events/{record}'
 */
ViewEvent.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ViewEvent.url(args, options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\Events\Pages\ViewEvent::__invoke
 * @see app/Filament/Resources/Events/Pages/ViewEvent.php:7
 * @route '/admin/events/{record}'
 */
ViewEvent.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ViewEvent.url(args, options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\Events\Pages\ViewEvent::__invoke
 * @see app/Filament/Resources/Events/Pages/ViewEvent.php:7
 * @route '/admin/events/{record}'
 */
    const ViewEventForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ViewEvent.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\Events\Pages\ViewEvent::__invoke
 * @see app/Filament/Resources/Events/Pages/ViewEvent.php:7
 * @route '/admin/events/{record}'
 */
        ViewEventForm.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ViewEvent.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\Events\Pages\ViewEvent::__invoke
 * @see app/Filament/Resources/Events/Pages/ViewEvent.php:7
 * @route '/admin/events/{record}'
 */
        ViewEventForm.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ViewEvent.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ViewEvent.form = ViewEventForm
export default ViewEvent