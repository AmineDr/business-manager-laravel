<?php

/** @var Router $router */

use Laravel\Lumen\Routing\Router;

$router->get('/api', function () use ($router) {
    return $router->app->version();
});

$router->get('/api/ping', function () use ($router) {
    return ["status"=>"pong"];
});

$router->group(['prefix'=>'/api'], function () use ($router) {
    $router->post('login', 'UserController@login');
});

$router->group(['prefix'=>'/api/user', 'middleware'=>'auth'], function () use ($router) {
    $router->get('self', 'UserController@getAuthenticatedUser');
});

$router->group(['prefix'=>'/api/customers', 'middleware'=>'auth'], function () use ($router) {
    $router->get('', 'CustomerController@get');
    $router->get('{id}', 'CustomerController@getId');
    $router->post('add', 'CustomerController@add');
    $router->delete('{id}', 'CustomerController@delete');
});

$router->group(['prefix'=>'/api/projects'], function () use ($router) {
    $router->get('', 'ProjectController@get');
    $router->get('{id}', 'ProjectController@getId');
    $router->post('add', 'ProjectController@add');
    $router->delete('{id}', 'ProjectController@delete');
});

$router->group(['prefix'=>'/api/installments'], function () use ($router) {
    $router->get('', 'InstallmentController@getByProject');
    $router->post('', 'InstallmentController@add');
    $router->delete('{id}', 'InstallmentController@delete');
});

