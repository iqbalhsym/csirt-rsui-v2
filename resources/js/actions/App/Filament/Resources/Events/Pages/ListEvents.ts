import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\Events\Pages\ListEvents::__invoke
 * @see app/Filament/Resources/Events/Pages/ListEvents.php:7
 * @route '/admin/events'
 */
const ListEvents = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListEvents.url(options),
    method: 'get',
})

ListEvents.definition = {
    methods: ["get","head"],
    url: '/admin/events',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Events\Pages\ListEvents::__invoke
 * @see app/Filament/Resources/Events/Pages/ListEvents.php:7
 * @route '/admin/events'
 */
ListEvents.url = (options?: RouteQueryOptions) => {
    return ListEvents.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\Events\Pages\ListEvents::__invoke
 * @see app/Filament/Resources/Events/Pages/ListEvents.php:7
 * @route '/admin/events'
 */
ListEvents.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListEvents.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\Events\Pages\ListEvents::__invoke
 * @see app/Filament/Resources/Events/Pages/ListEvents.php:7
 * @route '/admin/events'
 */
ListEvents.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ListEvents.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\Events\Pages\ListEvents::__invoke
 * @see app/Filament/Resources/Events/Pages/ListEvents.php:7
 * @route '/admin/events'
 */
    const ListEventsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ListEvents.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\Events\Pages\ListEvents::__invoke
 * @see app/Filament/Resources/Events/Pages/ListEvents.php:7
 * @route '/admin/events'
 */
        ListEventsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListEvents.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\Events\Pages\ListEvents::__invoke
 * @see app/Filament/Resources/Events/Pages/ListEvents.php:7
 * @route '/admin/events'
 */
        ListEventsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListEvents.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ListEvents.form = ListEventsForm
export default ListEvents