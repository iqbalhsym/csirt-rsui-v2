import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\PublicKeys\Pages\EditPublicKey::__invoke
 * @see app/Filament/Resources/PublicKeys/Pages/EditPublicKey.php:7
 * @route '/admin/public-keys/{record}/edit'
 */
const EditPublicKey = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditPublicKey.url(args, options),
    method: 'get',
})

EditPublicKey.definition = {
    methods: ["get","head"],
    url: '/admin/public-keys/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\PublicKeys\Pages\EditPublicKey::__invoke
 * @see app/Filament/Resources/PublicKeys/Pages/EditPublicKey.php:7
 * @route '/admin/public-keys/{record}/edit'
 */
EditPublicKey.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return EditPublicKey.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Filament\Resources\PublicKeys\Pages\EditPublicKey::__invoke
 * @see app/Filament/Resources/PublicKeys/Pages/EditPublicKey.php:7
 * @route '/admin/public-keys/{record}/edit'
 */
EditPublicKey.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditPublicKey.url(args, options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\PublicKeys\Pages\EditPublicKey::__invoke
 * @see app/Filament/Resources/PublicKeys/Pages/EditPublicKey.php:7
 * @route '/admin/public-keys/{record}/edit'
 */
EditPublicKey.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: EditPublicKey.url(args, options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\PublicKeys\Pages\EditPublicKey::__invoke
 * @see app/Filament/Resources/PublicKeys/Pages/EditPublicKey.php:7
 * @route '/admin/public-keys/{record}/edit'
 */
    const EditPublicKeyForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: EditPublicKey.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\PublicKeys\Pages\EditPublicKey::__invoke
 * @see app/Filament/Resources/PublicKeys/Pages/EditPublicKey.php:7
 * @route '/admin/public-keys/{record}/edit'
 */
        EditPublicKeyForm.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EditPublicKey.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\PublicKeys\Pages\EditPublicKey::__invoke
 * @see app/Filament/Resources/PublicKeys/Pages/EditPublicKey.php:7
 * @route '/admin/public-keys/{record}/edit'
 */
        EditPublicKeyForm.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EditPublicKey.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    EditPublicKey.form = EditPublicKeyForm
export default EditPublicKey