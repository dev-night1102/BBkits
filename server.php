<?php

/**
 * Laravel development server router.
 * This file allows PHP built-in server to serve static files.
 */

$uri = urldecode(
    parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? ''
);

// Serve static files from public directory
$filePath = __DIR__ . '/public' . $uri;

if ($uri !== '/' && file_exists($filePath) && !is_dir($filePath)) {
    // Get the file extension
    $extension = strtolower(pathinfo($uri, PATHINFO_EXTENSION));
    
    // Set appropriate content type
    switch ($extension) {
        case 'css':
            header('Content-Type: text/css; charset=utf-8');
            break;
        case 'js':
            header('Content-Type: application/javascript; charset=utf-8');
            break;
        case 'png':
            header('Content-Type: image/png');
            break;
        case 'jpg':
        case 'jpeg':
            header('Content-Type: image/jpeg');
            break;
        case 'gif':
            header('Content-Type: image/gif');
            break;
        case 'svg':
            header('Content-Type: image/svg+xml');
            break;
        case 'ico':
            header('Content-Type: image/x-icon');
            break;
        case 'woff':
            header('Content-Type: font/woff');
            break;
        case 'woff2':
            header('Content-Type: font/woff2');
            break;
        case 'ttf':
            header('Content-Type: font/ttf');
            break;
        case 'json':
            header('Content-Type: application/json');
            break;
    }
    
    // Add cache headers for assets
    if (strpos($uri, '/build/assets/') !== false) {
        header('Cache-Control: public, max-age=31536000');
    }
    
    return false; // Serve the requested resource as-is
}

// Route everything else through Laravel
require_once __DIR__.'/public/index.php';