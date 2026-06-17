import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\Documents\Pages\EditDocument::__invoke
 * @see app/Filament/Resources/Documents/Pages/EditDocument.php:7
 * @route '/admin/documents/{record}/edit'
 */
const EditDocument = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditDocument.url(args, options),
    method: 'get',
})

EditDocument.definition = {
    methods: ["get","head"],
    url: '/admin/documents/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Documents\Pages\EditDocument::__invoke
 * @see app/Filament/Resources/Documents/Pages/EditDocument.php:7
 * @route '/admin/documents/{record}/edit'
 */
EditDocument.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return EditDocument.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Filament\Resources\Documents\Pages\EditDocument::__invoke
 * @see app/Filament/Resources/Documents/Pages/EditDocument.php:7
 * @route '/admin/documents/{record}/edit'
 */
EditDocument.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditDocument.url(args, options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\Documents\Pages\EditDocument::__invoke
 * @see app/Filament/Resources/Documents/Pages/EditDocument.php:7
 * @route '/admin/documents/{record}/edit'
 */
EditDocument.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: EditDocument.url(args, options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\Documents\Pages\EditDocument::__invoke
 * @see app/Filament/Resources/Documents/Pages/EditDocument.php:7
 * @route '/admin/documents/{record}/edit'
 */
    const EditDocumentForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: EditDocument.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\Documents\Pages\EditDocument::__invoke
 * @see app/Filament/Resources/Documents/Pages/EditDocument.php:7
 * @route '/admin/documents/{record}/edit'
 */
        EditDocumentForm.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EditDocument.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\Documents\Pages\EditDocument::__invoke
 * @see app/Filament/Resources/Documents/Pages/EditDocument.php:7
 * @route '/admin/documents/{record}/edit'
 */
        EditDocumentForm.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: EditDocument.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    EditDocument.form = EditDocumentForm
export default EditDocument