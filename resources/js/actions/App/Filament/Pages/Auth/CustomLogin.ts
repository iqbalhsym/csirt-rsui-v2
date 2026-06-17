import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Filament\Pages\Auth\CustomLogin::__invoke
 * @see app/Filament/Pages/Auth/CustomLogin.php:7
 * @route '/admin/login'
 */
const CustomLogin = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CustomLogin.url(options),
    method: 'get',
})

CustomLogin.definition = {
    methods: ["get","head"],
    url: '/admin/login',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Pages\Auth\CustomLogin::__invoke
 * @see app/Filament/Pages/Auth/CustomLogin.php:7
 * @route '/admin/login'
 */
CustomLogin.url = (options?: RouteQueryOptions) => {
    return CustomLogin.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Pages\Auth\CustomLogin::__invoke
 * @see app/Filament/Pages/Auth/CustomLogin.php:7
 * @route '/admin/login'
 */
CustomLogin.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CustomLogin.url(options),
    method: 'get',
})
/**
* @see \App\Filament\Pages\Auth\CustomLogin::__invoke
 * @see app/Filament/Pages/Auth/CustomLogin.php:7
 * @route '/admin/login'
 */
CustomLogin.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CustomLogin.url(options),
    method: 'head',
})

    /**
* @see \App\Filament\Pages\Auth\CustomLogin::__invoke
 * @see app/Filament/Pages/Auth/CustomLogin.php:7
 * @route '/admin/login'
 */
    const CustomLoginForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: CustomLogin.url(options),
        method: 'get',
    })

            /**
* @see \App\Filament\Pages\Auth\CustomLogin::__invoke
 * @see app/Filament/Pages/Auth/CustomLogin.php:7
 * @route '/admin/login'
 */
        CustomLoginForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CustomLogin.url(options),
            method: 'get',
        })
            /**
* @see \App\Filament\Pages\Auth\CustomLogin::__invoke
 * @see app/Filament/Pages/Auth/CustomLogin.php:7
 * @route '/admin/login'
 */
        CustomLoginForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CustomLogin.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    CustomLogin.form = CustomLoginForm
export default CustomLogin