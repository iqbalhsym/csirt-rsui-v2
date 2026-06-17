import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\Events\Pages\CreateEvent::__invoke
 * @see app/Filament/Resources/Events/Pages/CreateEvent.php:7
 * @route '/admin/events/create'
 */
const CreateEvent = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateEvent.url(options),
    method: 'get',
})

CreateEvent.definition = {
    methods: ["get","head"],
    url: '/admin/events/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Events\Pages\CreateEvent::__invoke
 * @see app/Filament/Resources/Events/Pages/CreateEvent.php:7
 * @route '/admin/events/create'
 */
CreateEvent.url = (options?: RouteQueryOptions) => {
    return CreateEvent.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\Events\Pages\CreateEvent::__invoke
 * @see app/Filament/Resources/Events/Pages/CreateEvent.php:7
 * @route '/admin/events/create'
 */
CreateEvent.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateEvent.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\Events\Pages\CreateEvent::__invoke
 * @see app/Filament/Resources/Events/Pages/CreateEvent.php:7
 * @route '/admin/events/create'
 */
CreateEvent.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CreateEvent.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\Events\Pages\CreateEvent::__invoke
 * @see app/Filament/Resources/Events/Pages/CreateEvent.php:7
 * @route '/admin/events/create'
 */
    const CreateEventForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: CreateEvent.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\Events\Pages\CreateEvent::__invoke
 * @see app/Filament/Resources/Events/Pages/CreateEvent.php:7
 * @route '/admin/events/create'
 */
        CreateEventForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreateEvent.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\Events\Pages\CreateEvent::__invoke
 * @see app/Filament/Resources/Events/Pages/CreateEvent.php:7
 * @route '/admin/events/create'
 */
        CreateEventForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreateEvent.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    CreateEvent.form = CreateEventForm
export default CreateEvent