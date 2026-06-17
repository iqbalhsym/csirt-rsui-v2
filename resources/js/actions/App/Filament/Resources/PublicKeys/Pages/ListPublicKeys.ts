import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\PublicKeys\Pages\ListPublicKeys::__invoke
 * @see app/Filament/Resources/PublicKeys/Pages/ListPublicKeys.php:7
 * @route '/admin/public-keys'
 */
const ListPublicKeys = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListPublicKeys.url(options),
    method: 'get',
})

ListPublicKeys.definition = {
    methods: ["get","head"],
    url: '/admin/public-keys',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\PublicKeys\Pages\ListPublicKeys::__invoke
 * @see app/Filament/Resources/PublicKeys/Pages/ListPublicKeys.php:7
 * @route '/admin/public-keys'
 */
ListPublicKeys.url = (options?: RouteQueryOptions) => {
    return ListPublicKeys.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\PublicKeys\Pages\ListPublicKeys::__invoke
 * @see app/Filament/Resources/PublicKeys/Pages/ListPublicKeys.php:7
 * @route '/admin/public-keys'
 */
ListPublicKeys.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListPublicKeys.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\PublicKeys\Pages\ListPublicKeys::__invoke
 * @see app/Filament/Resources/PublicKeys/Pages/ListPublicKeys.php:7
 * @route '/admin/public-keys'
 */
ListPublicKeys.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ListPublicKeys.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\PublicKeys\Pages\ListPublicKeys::__invoke
 * @see app/Filament/Resources/PublicKeys/Pages/ListPublicKeys.php:7
 * @route '/admin/public-keys'
 */
    const ListPublicKeysForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ListPublicKeys.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\PublicKeys\Pages\ListPublicKeys::__invoke
 * @see app/Filament/Resources/PublicKeys/Pages/ListPublicKeys.php:7
 * @route '/admin/public-keys'
 */
        ListPublicKeysForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListPublicKeys.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\PublicKeys\Pages\ListPublicKeys::__invoke
 * @see app/Filament/Resources/PublicKeys/Pages/ListPublicKeys.php:7
 * @route '/admin/public-keys'
 */
        ListPublicKeysForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListPublicKeys.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ListPublicKeys.form = ListPublicKeysForm
export default ListPublicKeys