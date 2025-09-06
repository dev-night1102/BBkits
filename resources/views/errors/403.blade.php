@extends('layouts.app')

@section('content')
    <div class="text-center py-10">
        <h1 class="text-4xl font-bold text-red-600">403 - Acesso Negado</h1>
        <p class="mt-4 text-gray-600">Você não tem permissão para acessar esta página.</p>
        <a href="{{ url()->previous() }}" class="mt-6 inline-block text-blue-600 underline">Voltar</a>
    </div>
@endsection
