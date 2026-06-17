import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\Documents\Pages\CreateDocument::__invoke
 * @see app/Filament/Resources/Documents/Pages/CreateDocument.php:7
 * @route '/admin/documents/create'
 */
const CreateDocument = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateDocument.url(options),
    method: 'get',
})

CreateDocument.definition = {
    methods: ["get","head"],
    url: '/admin/documents/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Documents\Pages\CreateDocument::__invoke
 * @see app/Filament/Resources/Documents/Pages/CreateDocument.php:7
 * @route '/admin/documents/create'
 */
CreateDocument.url = (options?: RouteQueryOptions) => {
    return CreateDocument.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\Documents\Pages\CreateDocument::__invoke
 * @see app/Filament/Resources/Documents/Pages/CreateDocument.php:7
 * @route '/admin/documents/create'
 */
CreateDocument.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateDocument.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Resources\Documents\Pages\CreateDocument::__invoke
 * @see app/Filament/Resources/Documents/Pages/CreateDocument.php:7
 * @route '/admin/documents/create'
 */
CreateDocument.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CreateDocument.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Resources\Documents\Pages\CreateDocument::__invoke
 * @see app/Filament/Resources/Documents/Pages/CreateDocument.php:7
 * @route '/admin/documents/create'
 */
    const CreateDocumentForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: CreateDocument.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Resources\Documents\Pages\CreateDocument::__invoke
 * @see app/Filament/Resources/Documents/Pages/CreateDocument.php:7
 * @route '/admin/documents/create'
 */
        CreateDocumentForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreateDocument.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Resources\Documents\Pages\CreateDocument::__invoke
 * @see app/Filament/Resources/Documents/Pages/CreateDocument.php:7
 * @route '/admin/documents/create'
 */
        CreateDocumentForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CreateDocument.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    CreateDocument.form = CreateDocumentForm
export default CreateDocument