import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\PublicKeys\Pages\CreatePublicKey::__invoke
 * @see app/Filament/Resources/PublicKeys/Pages/CreatePublicKey.php:7
 * @route '/admin/public-keys/create'
 */
const CreatePublicKey = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreatePublicKey.url(options),
    method: 'get',
})

CreatePublicKey.definition = {
    methods: ["get","head"],
    url: '/admin/public-keys/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\PublicKeys\Pages\CreatePublicKey::__invoke
 * @see app/Filament/Resources/PublicKeys/Pages/CreatePublicKey.php:7
 * @route '/admin/public-keys/create'
 */
CreatePublicKey.url = (options?: RouteQueryOptions) => {
    return CreatePublicKey.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\PublicKeys\Pages\CreatePublicKey::__invoke
 * @see app/Filament/Resources/PublicKeys/Pages/CreatePublicKey.php:7
 * @route '/admin/public-keys/create'
 */
CreatePublicKey.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreatePublicKey.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\PublicKeys\Pages\CreatePublicKey::__invoke
 * @see app/Filament/Resources/PublicKeys/Pages/CreatePublicKey.php:7
 * @route '/admin/public-keys/create'
 */
CreatePublicKey.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CreatePublicKey.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\PublicKeys\Pages\CreatePublicKey::__invoke
 * @see app/Filament/Resources/PublicKeys/Pages/CreatePublicKey.php:7
 * @route '/admin/public-keys/create'
 */
    const CreatePublicKeyForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: CreatePublicKey.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\PublicKeys\Pages\CreatePublicKey::__invoke
 * @see app/Filament/Resources/PublicKeys/Pages/CreatePublicKey.php:7
 * @route '/admin/public-keys/create'
 */
        CreatePublicKeyForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreatePublicKey.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\PublicKeys\Pages\CreatePublicKey::__invoke
 * @see app/Filament/Resources/PublicKeys/Pages/CreatePublicKey.php:7
 * @route '/admin/public-keys/create'
 */
        CreatePublicKeyForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreatePublicKey.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    CreatePublicKey.form = CreatePublicKeyForm
export default CreatePublicKey