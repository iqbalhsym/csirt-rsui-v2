import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\Documents\Pages\ListDocuments::__invoke
 * @see app/Filament/Resources/Documents/Pages/ListDocuments.php:7
 * @route '/admin/documents'
 */
const ListDocuments = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListDocuments.url(options),
    method: 'get',
})

ListDocuments.definition = {
    methods: ["get","head"],
    url: '/admin/documents',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Documents\Pages\ListDocuments::__invoke
 * @see app/Filament/Resources/Documents/Pages/ListDocuments.php:7
 * @route '/admin/documents'
 */
ListDocuments.url = (options?: RouteQueryOptions) => {
    return ListDocuments.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\Documents\Pages\ListDocuments::__invoke
 * @see app/Filament/Resources/Documents/Pages/ListDocuments.php:7
 * @route '/admin/documents'
 */
ListDocuments.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListDocuments.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\Documents\Pages\ListDocuments::__invoke
 * @see app/Filament/Resources/Documents/Pages/ListDocuments.php:7
 * @route '/admin/documents'
 */
ListDocuments.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ListDocuments.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\Documents\Pages\ListDocuments::__invoke
 * @see app/Filament/Resources/Documents/Pages/ListDocuments.php:7
 * @route '/admin/documents'
 */
    const ListDocumentsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ListDocuments.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\Documents\Pages\ListDocuments::__invoke
 * @see app/Filament/Resources/Documents/Pages/ListDocuments.php:7
 * @route '/admin/documents'
 */
        ListDocumentsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListDocuments.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\Documents\Pages\ListDocuments::__invoke
 * @see app/Filament/Resources/Documents/Pages/ListDocuments.php:7
 * @route '/admin/documents'
 */
        ListDocumentsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ListDocuments.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ListDocuments.form = ListDocumentsForm
export default ListDocuments