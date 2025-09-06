<?php

namespace App\Http\Controllers;

use App\Models\OrderComment;
use App\Models\Sale;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderCommentController extends Controller
{
    public function store(Request $request, Sale $sale)
    {
        $validated = $request->validate([
            'comment' => 'required|string|max:1000',
            'department' => 'required|in:finance,production,admin,sales,general',
            'mention_user_id' => 'nullable|exists:users,id',
            'is_internal' => 'boolean'
        ]);

        $comment = OrderComment::create([
            'sale_id' => $sale->id,
            'user_id' => Auth::id(),
            'department' => $validated['department'],
            'comment' => $validated['comment'],
            'is_internal' => $validated['is_internal'] ?? true,
            'mention_user_id' => $validated['mention_user_id']
        ]);

        // Send notification to mentioned user if exists
        if ($comment->mention_user_id) {
            $notificationService = app(\App\Services\NotificationService::class);
            $notificationService->notifyUserMentioned($comment);
        }

        return back()->with('success', 'Comentário adicionado com sucesso!');
    }

    public function index(Sale $sale)
    {
        $comments = $sale->comments()
            ->with(['user', 'mentionedUser'])
            ->latest()
            ->paginate(20);

        return response()->json($comments);
    }

    public function update(Request $request, OrderComment $comment)
    {
        // Only allow the author to edit their comment
        if ($comment->user_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }

        $validated = $request->validate([
            'comment' => 'required|string|max:1000'
        ]);

        $comment->update($validated);

        return back()->with('success', 'Comentário atualizado com sucesso!');
    }

    public function destroy(OrderComment $comment)
    {
        // Only allow the author or admin to delete comment
        if ($comment->user_id !== Auth::id() && !Auth::user()->isAdmin()) {
            abort(403, 'Unauthorized');
        }

        $comment->delete();

        return back()->with('success', 'Comentário removido com sucesso!');
    }
}