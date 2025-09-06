<?php

/**
 * Laravel production server router for PHP built-in server.
 * Handles static files including Vite build assets.
 */

$uri = urldecode(
    parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? ''
);

// Define the document root
$publicPath = __DIR__ . '/public';

// Build the full file path
$filePath = $publicPath . $uri;

// Check if this is a static file request
if ($uri !== '/' && file_exists($filePath) && is_file($filePath)) {
    // Determine the content type based on file extension
    $extension = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
    
    $mimeTypes = [
        'css' => 'text/css',
        'js' => 'application/javascript',
        'json' => 'application/json',
        'png' => 'image/png',
        'jpg' => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'gif' => 'image/gif',
        'svg' => 'image/svg+xml',
        'ico' => 'image/x-icon',
        'woff' => 'font/woff',
        'woff2' => 'font/woff2',
        'ttf' => 'font/ttf',
        'otf' => 'font/otf',
        'eot' => 'application/vnd.ms-fontobject',
        'webp' => 'image/webp',
        'map' => 'application/json',
    ];
    
    // Set the appropriate content type
    if (isset($mimeTypes[$extension])) {
        header('Content-Type: ' . $mimeTypes[$extension]);
    }
    
    // Add cache headers for build assets
    if (strpos($uri, '/build/') !== false || strpos($uri, '/assets/') !== false) {
        header('Cache-Control: public, max-age=31536000, immutable');
    }
    
    // Read and output the file
    readfile($filePath);
    exit;
}

// Check if request is for a directory index
if (is_dir($filePath) && file_exists($filePath . '/index.html')) {
    header('Content-Type: text/html');
    readfile($filePath . '/index.html');
    exit;
}

// Route all other requests through Laravel
require_once __DIR__ . '/public/index.php';