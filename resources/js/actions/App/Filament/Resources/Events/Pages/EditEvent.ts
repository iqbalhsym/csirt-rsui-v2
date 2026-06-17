import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\Events\Pages\EditEvent::__invoke
 * @see app/Filament/Resources/Events/Pages/EditEvent.php:7
 * @route '/admin/events/{record}/edit'
 */
const EditEvent = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditEvent.url(args, options),
    method: 'get',
})

EditEvent.definition = {
    methods: ["get","head"],
    url: '/admin/events/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Events\Pages\EditEvent::__invoke
 * @see app/Filament/Resources/Events/Pages/EditEvent.php:7
 * @route '/admin/events/{record}/edit'
 */
EditEvent.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return EditEvent.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Filament\Resources\Events\Pages\EditEvent::__invoke
 * @see app/Filament/Resources/Events/Pages/EditEvent.php:7
 * @route '/admin/events/{record}/edit'
 */
EditEvent.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditEvent.url(args, options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\Events\Pages\EditEvent::__invoke
 * @see app/Filament/Resources/Events/Pages/EditEvent.php:7
 * @route '/admin/events/{record}/edit'
 */
EditEvent.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: EditEvent.url(args, options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\Events\Pages\EditEvent::__invoke
 * @see app/Filament/Resources/Events/Pages/EditEvent.php:7
 * @route '/admin/events/{record}/edit'
 */
    const EditEventForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: EditEvent.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\Events\Pages\EditEvent::__invoke
 * @see app/Filament/Resources/Events/Pages/EditEvent.php:7
 * @route '/admin/events/{record}/edit'
 */
        EditEventForm.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EditEvent.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\Events\Pages\EditEvent::__invoke
 * @see app/Filament/Resources/Events/Pages/EditEvent.php:7
 * @route '/admin/events/{record}/edit'
 */
        EditEventForm.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EditEvent.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    EditEvent.form = EditEventForm
export default EditEvent