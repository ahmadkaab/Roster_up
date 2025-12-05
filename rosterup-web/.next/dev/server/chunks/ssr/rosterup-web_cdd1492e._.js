module.exports = [
"[project]/rosterup-web/src/lib/supabase/server.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/rosterup-web/node_modules/@supabase/ssr/dist/module/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/node_modules/next/headers.js [app-rsc] (ecmascript)");
;
;
async function createClient() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://okglthppvldlocogbcmn.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rZ2x0aHBwdmxkbG9jb2diY21uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4Mzk0OTcsImV4cCI6MjA3OTQxNTQ5N30.4WwDnXaIISAhX0cb3-FHOkbj3xaZ7ylEkaY_fx5g66I"), {
        cookies: {
            getAll () {
                return cookieStore.getAll();
            },
            setAll (cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options })=>cookieStore.set(name, value, options));
                } catch  {
                // The `setAll` method was called from a Server Component.
                // This can be ignored if you have middleware refreshing
                // user sessions.
                }
            }
        }
    });
}
}),
"[project]/rosterup-web/src/actions/friends.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00696765927aa2e8da5c7fd1673b29b24e96a7998b":"getPendingRequests","00b5ece5edc832479f85ee476004fa2c4e1f3c2378":"getFriends","40016b2989d40d63111b61eb81a75aeaffa00b116e":"acceptFriendRequest","401dc02dc6c8f3e61f24e9c38f70383e04e10ee295":"sendFriendRequest","40b394699fb866452df9923a1f32be5d94a03cb2d6":"removeFriend","40bfc6ef447e123136f23c7087771d0ff4433fb730":"rejectFriendRequest"},"",""] */ __turbopack_context__.s([
    "acceptFriendRequest",
    ()=>acceptFriendRequest,
    "getFriends",
    ()=>getFriends,
    "getPendingRequests",
    ()=>getPendingRequests,
    "rejectFriendRequest",
    ()=>rejectFriendRequest,
    "removeFriend",
    ()=>removeFriend,
    "sendFriendRequest",
    ()=>sendFriendRequest
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/src/lib/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function sendFriendRequest(friendId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");
    // Check if request already exists (in either direction)
    const { data: existing } = await supabase.from("friendships").select("*").or(`and(user_id.eq.${user.id},friend_id.eq.${friendId}),and(user_id.eq.${friendId},friend_id.eq.${user.id})`).single();
    if (existing) {
        if (existing.status === 'accepted') throw new Error("Already friends");
        if (existing.status === 'pending') throw new Error("Request already pending");
        if (existing.status === 'blocked') throw new Error("Cannot send request");
    }
    const { error } = await supabase.from("friendships").insert({
        user_id: user.id,
        friend_id: friendId,
        status: "pending"
    });
    if (error) throw error;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/player/${friendId}`);
}
async function acceptFriendRequest(friendshipId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");
    const { error } = await supabase.from("friendships").update({
        status: "accepted",
        updated_at: new Date().toISOString()
    }).eq("id", friendshipId).eq("friend_id", user.id); // Only the recipient can accept
    if (error) throw error;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard");
}
async function rejectFriendRequest(friendshipId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");
    const { error } = await supabase.from("friendships").update({
        status: "rejected",
        updated_at: new Date().toISOString()
    }).eq("id", friendshipId).eq("friend_id", user.id);
    if (error) throw error;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard");
}
async function removeFriend(friendshipId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");
    const { error } = await supabase.from("friendships").delete().eq("id", friendshipId)// Ensure user is part of the friendship
    .or(`user_id.eq.${user.id},friend_id.eq.${user.id}`);
    if (error) throw error;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard");
}
async function getFriends() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];
    const { data: friendships } = await supabase.from("friendships").select(`
      id,
      user_id,
      friend_id,
      status,
      friend:friend_id(email), 
      user:user_id(email)
    `) // Note: This assumes we can fetch email, but ideally we fetch profiles
    .eq("status", "accepted").or(`user_id.eq.${user.id},friend_id.eq.${user.id}`);
    // We need to fetch profiles manually or via join if profiles table is linked
    // For now, let's assume we need to fetch profiles separately or rely on what we have.
    // A better approach is to fetch the profile of the "other" person.
    if (!friendships) return [];
    const friendIds = friendships.map((f)=>f.user_id === user.id ? f.friend_id : f.user_id);
    const friendshipMap = new Map(friendships.map((f)=>[
            f.user_id === user.id ? f.friend_id : f.user_id,
            f.id
        ]));
    const { data: profiles } = await supabase.from("player_cards").select("player_id, ign, primary_role, game").in("player_id", friendIds);
    return profiles?.map((p)=>({
            ...p,
            friendship_id: friendshipMap.get(p.player_id)
        })) || [];
}
async function getPendingRequests() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return {
        incoming: [],
        outgoing: []
    };
    const { data: incoming } = await supabase.from("friendships").select("*, user:user_id(email)") // Sender info
    .eq("friend_id", user.id).eq("status", "pending");
    const { data: outgoing } = await supabase.from("friendships").select("*, friend:friend_id(email)") // Recipient info
    .eq("user_id", user.id).eq("status", "pending");
    // Fetch profiles for better display
    const incomingIds = incoming?.map((f)=>f.user_id) || [];
    const outgoingIds = outgoing?.map((f)=>f.friend_id) || [];
    const { data: profiles } = await supabase.from("player_cards").select("player_id, ign").in("player_id", [
        ...incomingIds,
        ...outgoingIds
    ]);
    const profileMap = new Map(profiles?.map((p)=>[
            p.player_id,
            p
        ]));
    const incomingWithProfiles = incoming?.map((req)=>({
            ...req,
            sender_profile: profileMap.get(req.user_id)
        }));
    const outgoingWithProfiles = outgoing?.map((req)=>({
            ...req,
            recipient_profile: profileMap.get(req.friend_id)
        }));
    return {
        incoming: incomingWithProfiles || [],
        outgoing: outgoingWithProfiles || []
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    removeFriend,
    getFriends,
    getPendingRequests
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(sendFriendRequest, "401dc02dc6c8f3e61f24e9c38f70383e04e10ee295", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(acceptFriendRequest, "40016b2989d40d63111b61eb81a75aeaffa00b116e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(rejectFriendRequest, "40bfc6ef447e123136f23c7087771d0ff4433fb730", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(removeFriend, "40b394699fb866452df9923a1f32be5d94a03cb2d6", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getFriends, "00b5ece5edc832479f85ee476004fa2c4e1f3c2378", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPendingRequests, "00696765927aa2e8da5c7fd1673b29b24e96a7998b", null);
}),
"[project]/rosterup-web/.next-internal/server/app/(dashboard)/dashboard/page/actions.js { ACTIONS_MODULE0 => \"[project]/rosterup-web/src/actions/friends.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$actions$2f$friends$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/src/actions/friends.ts [app-rsc] (ecmascript)");
;
;
;
;
;
}),
"[project]/rosterup-web/.next-internal/server/app/(dashboard)/dashboard/page/actions.js { ACTIONS_MODULE0 => \"[project]/rosterup-web/src/actions/friends.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00696765927aa2e8da5c7fd1673b29b24e96a7998b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$actions$2f$friends$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPendingRequests"],
    "00b5ece5edc832479f85ee476004fa2c4e1f3c2378",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$actions$2f$friends$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFriends"],
    "40016b2989d40d63111b61eb81a75aeaffa00b116e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$actions$2f$friends$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["acceptFriendRequest"],
    "40b394699fb866452df9923a1f32be5d94a03cb2d6",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$actions$2f$friends$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["removeFriend"],
    "40bfc6ef447e123136f23c7087771d0ff4433fb730",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$actions$2f$friends$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rejectFriendRequest"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f2e$next$2d$internal$2f$server$2f$app$2f28$dashboard$292f$dashboard$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$rosterup$2d$web$2f$src$2f$actions$2f$friends$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/rosterup-web/.next-internal/server/app/(dashboard)/dashboard/page/actions.js { ACTIONS_MODULE0 => "[project]/rosterup-web/src/actions/friends.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$actions$2f$friends$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/src/actions/friends.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=rosterup-web_cdd1492e._.js.map