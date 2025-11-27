(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/rosterup-web/src/components/ui/badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge,
    "badgeVariants",
    ()=>badgeVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
    variants: {
        variant: {
            default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
            secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
            destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
            outline: "text-foreground"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
function Badge({ className, variant, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/rosterup-web/src/components/ui/badge.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_c = Badge;
;
var _c;
__turbopack_context__.k.register(_c, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/rosterup-web/src/components/ui/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Card = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-xl border border-white/10 bg-white/5 text-card-foreground shadow-sm backdrop-blur-md", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/rosterup-web/src/components/ui/card.tsx",
        lineNumber: 9,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c1 = Card;
Card.displayName = "Card";
const CardHeader = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c2 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col space-y-1.5 p-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/rosterup-web/src/components/ui/card.tsx",
        lineNumber: 24,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c3 = CardHeader;
CardHeader.displayName = "CardHeader";
const CardTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c4 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-2xl font-semibold leading-none tracking-tight", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/rosterup-web/src/components/ui/card.tsx",
        lineNumber: 36,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c5 = CardTitle;
CardTitle.displayName = "CardTitle";
const CardDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c6 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/rosterup-web/src/components/ui/card.tsx",
        lineNumber: 51,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c7 = CardDescription;
CardDescription.displayName = "CardDescription";
const CardContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c8 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/rosterup-web/src/components/ui/card.tsx",
        lineNumber: 63,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c9 = CardContent;
CardContent.displayName = "CardContent";
const CardFooter = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c10 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/rosterup-web/src/components/ui/card.tsx",
        lineNumber: 71,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c11 = CardFooter;
CardFooter.displayName = "CardFooter";
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;
__turbopack_context__.k.register(_c, "Card$React.forwardRef");
__turbopack_context__.k.register(_c1, "Card");
__turbopack_context__.k.register(_c2, "CardHeader$React.forwardRef");
__turbopack_context__.k.register(_c3, "CardHeader");
__turbopack_context__.k.register(_c4, "CardTitle$React.forwardRef");
__turbopack_context__.k.register(_c5, "CardTitle");
__turbopack_context__.k.register(_c6, "CardDescription$React.forwardRef");
__turbopack_context__.k.register(_c7, "CardDescription");
__turbopack_context__.k.register(_c8, "CardContent$React.forwardRef");
__turbopack_context__.k.register(_c9, "CardContent");
__turbopack_context__.k.register(_c10, "CardFooter$React.forwardRef");
__turbopack_context__.k.register(_c11, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlayerDashboard",
    ()=>PlayerDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/src/contexts/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/src/lib/supabase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crosshair$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crosshair$3e$__ = __turbopack_context__.i("[project]/rosterup-web/node_modules/lucide-react/dist/esm/icons/crosshair.js [app-client] (ecmascript) <export default as Crosshair>");
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__ = __turbopack_context__.i("[project]/rosterup-web/node_modules/lucide-react/dist/esm/icons/square-pen.js [app-client] (ecmascript) <export default as Edit>");
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gamepad$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gamepad2$3e$__ = __turbopack_context__.i("[project]/rosterup-web/node_modules/lucide-react/dist/esm/icons/gamepad-2.js [app-client] (ecmascript) <export default as Gamepad2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__ = __turbopack_context__.i("[project]/rosterup-web/node_modules/lucide-react/dist/esm/icons/instagram.js [app-client] (ecmascript) <export default as Instagram>");
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$swords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Swords$3e$__ = __turbopack_context__.i("[project]/rosterup-web/node_modules/lucide-react/dist/esm/icons/swords.js [app-client] (ecmascript) <export default as Swords>");
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/rosterup-web/node_modules/lucide-react/dist/esm/icons/trophy.js [app-client] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/rosterup-web/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$youtube$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Youtube$3e$__ = __turbopack_context__.i("[project]/rosterup-web/node_modules/lucide-react/dist/esm/icons/youtube.js [app-client] (ecmascript) <export default as Youtube>");
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
function PlayerDashboard() {
    _s();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [playerCard, setPlayerCard] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PlayerDashboard.useEffect": ()=>{
            async function fetchPlayerCard() {
                if (!user) return;
                const { data, error } = await supabase.from("player_cards").select("*, games(name)").eq("player_id", user.id).single();
                if (data) setPlayerCard(data);
                setLoading(false);
            }
            fetchPlayerCard();
        }
    }["PlayerDashboard.useEffect"], [
        user,
        supabase
    ]);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "animate-pulse space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-32 rounded-xl bg-white/5"
                }, void 0, false, {
                    fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                    lineNumber: 35,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid gap-4 md:grid-cols-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-40 rounded-xl bg-white/5"
                        }, void 0, false, {
                            fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                            lineNumber: 37,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-40 rounded-xl bg-white/5"
                        }, void 0, false, {
                            fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                            lineNumber: 38,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                    lineNumber: 36,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
            lineNumber: 34,
            columnNumber: 12
        }, this);
    }
    if (!playerCard) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center space-y-4 rounded-xl border border-dashed border-white/10 bg-white/5 p-8 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-full bg-primary/10 p-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gamepad$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gamepad2$3e$__["Gamepad2"], {
                        className: "h-8 w-8 text-primary"
                    }, void 0, false, {
                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                        lineNumber: 47,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                    lineNumber: 46,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-xl font-bold",
                    children: "Create Your Player Card"
                }, void 0, false, {
                    fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "max-w-md text-muted-foreground",
                    children: "To start applying for teams, you need to set up your player profile with your stats and roles."
                }, void 0, false, {
                    fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/profile/create",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        children: "Create Profile"
                    }, void 0, false, {
                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                        lineNumber: 54,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
            lineNumber: 45,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between rounded-xl border border-white/10 bg-gradient-to-r from-primary/20 to-accent/20 p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-bold text-white",
                                children: [
                                    "Welcome back, ",
                                    playerCard.ign,
                                    "!"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                lineNumber: 65,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white/80",
                                children: "Ready to find your next team?"
                            }, void 0, false, {
                                fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                lineNumber: 66,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: `/player/${user?.id}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    className: "border-white/20 bg-white/10 hover:bg-white/20",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                            className: "mr-2 h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                            lineNumber: 71,
                                            columnNumber: 15
                                        }, this),
                                        "Public Profile"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                    lineNumber: 70,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/profile/create",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    className: "border-white/20 bg-white/10 hover:bg-white/20",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__["Edit"], {
                                            className: "mr-2 h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                            lineNumber: 77,
                                            columnNumber: 15
                                        }, this),
                                        "Edit Profile"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                    lineNumber: 76,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "border-white/10 bg-white/5 backdrop-blur-md",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                className: "flex flex-row items-center justify-between space-y-0 pb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                        className: "text-sm font-medium",
                                        children: "K/D Ratio"
                                    }, void 0, false, {
                                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                        lineNumber: 88,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$swords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Swords$3e$__["Swords"], {
                                        className: "h-4 w-4 text-accent"
                                    }, void 0, false, {
                                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                        lineNumber: 89,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                lineNumber: 87,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-2xl font-bold",
                                        children: playerCard.kd_ratio
                                    }, void 0, false, {
                                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                        lineNumber: 92,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-muted-foreground",
                                        children: "Lifetime stats"
                                    }, void 0, false, {
                                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                        lineNumber: 93,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "border-white/10 bg-white/5 backdrop-blur-md",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                className: "flex flex-row items-center justify-between space-y-0 pb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                        className: "text-sm font-medium",
                                        children: "Avg Damage"
                                    }, void 0, false, {
                                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                        lineNumber: 98,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crosshair$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crosshair$3e$__["Crosshair"], {
                                        className: "h-4 w-4 text-primary"
                                    }, void 0, false, {
                                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                        lineNumber: 99,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                lineNumber: 97,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-2xl font-bold",
                                        children: playerCard.avg_damage
                                    }, void 0, false, {
                                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                        lineNumber: 102,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-muted-foreground",
                                        children: "Per match"
                                    }, void 0, false, {
                                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                        lineNumber: 103,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "border-white/10 bg-white/5 backdrop-blur-md",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                className: "flex flex-row items-center justify-between space-y-0 pb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                        className: "text-sm font-medium",
                                        children: "Primary Role"
                                    }, void 0, false, {
                                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                        lineNumber: 108,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gamepad$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gamepad2$3e$__["Gamepad2"], {
                                        className: "h-4 w-4 text-green-500"
                                    }, void 0, false, {
                                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                        lineNumber: 109,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                lineNumber: 107,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-2xl font-bold",
                                        children: playerCard.primary_role
                                    }, void 0, false, {
                                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                        lineNumber: 112,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-muted-foreground",
                                        children: playerCard.secondary_role ? `+ ${playerCard.secondary_role}` : "No secondary"
                                    }, void 0, false, {
                                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                        lineNumber: 113,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                lineNumber: 111,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "border-white/10 bg-white/5 backdrop-blur-md",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                className: "flex flex-row items-center justify-between space-y-0 pb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                        className: "text-sm font-medium",
                                        children: "Experience"
                                    }, void 0, false, {
                                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                        lineNumber: 120,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                        className: "h-4 w-4 text-yellow-500"
                                    }, void 0, false, {
                                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                        lineNumber: 121,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                lineNumber: 119,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-2xl font-bold",
                                        children: [
                                            playerCard.experience_years || 0,
                                            " Years"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                        lineNumber: 124,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-muted-foreground",
                                        children: "Competitive play"
                                    }, void 0, false, {
                                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                        lineNumber: 125,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                lineNumber: 123,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-6 md:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "border-white/10 bg-white/5 backdrop-blur-md",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                    children: "Achievements"
                                }, void 0, false, {
                                    fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                    lineNumber: 134,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                lineNumber: 133,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-2",
                                    children: playerCard.achievements && playerCard.achievements.length > 0 ? playerCard.achievements.map((achievement, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            variant: "secondary",
                                            className: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                                    className: "mr-1 h-3 w-3"
                                                }, void 0, false, {
                                                    fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                                    lineNumber: 141,
                                                    columnNumber: 21
                                                }, this),
                                                achievement
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                            lineNumber: 140,
                                            columnNumber: 19
                                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-muted-foreground",
                                        children: "No achievements added yet."
                                    }, void 0, false, {
                                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                        lineNumber: 146,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                    lineNumber: 137,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                lineNumber: 136,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "border-white/10 bg-white/5 backdrop-blur-md",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                    children: "Socials & Info"
                                }, void 0, false, {
                                    fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                    lineNumber: 155,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                lineNumber: 154,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-4",
                                        children: [
                                            playerCard.socials?.discord && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "rounded-full bg-[#5865F2]/20 p-2 text-[#5865F2]",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gamepad$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gamepad2$3e$__["Gamepad2"], {
                                                            className: "h-4 w-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                                            lineNumber: 162,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                                        lineNumber: 161,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: playerCard.socials.discord
                                                    }, void 0, false, {
                                                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                                        lineNumber: 164,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                                lineNumber: 160,
                                                columnNumber: 17
                                            }, this),
                                            playerCard.socials?.instagram && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "rounded-full bg-[#E1306C]/20 p-2 text-[#E1306C]",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__["Instagram"], {
                                                            className: "h-4 w-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                                            lineNumber: 170,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                                        lineNumber: 169,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: playerCard.socials.instagram
                                                    }, void 0, false, {
                                                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                                        lineNumber: 172,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                                lineNumber: 168,
                                                columnNumber: 17
                                            }, this),
                                            playerCard.socials?.youtube && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "rounded-full bg-[#FF0000]/20 p-2 text-[#FF0000]",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$youtube$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Youtube$3e$__["Youtube"], {
                                                            className: "h-4 w-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                                            lineNumber: 178,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                                        lineNumber: 177,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: playerCard.socials.youtube,
                                                        target: "_blank",
                                                        rel: "noreferrer",
                                                        className: "hover:underline",
                                                        children: "Channel"
                                                    }, void 0, false, {
                                                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                                        lineNumber: 180,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                                lineNumber: 176,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                        lineNumber: 158,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border-t border-white/10 pt-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted-foreground",
                                                        children: "Device:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                                        lineNumber: 188,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: playerCard.device_model || "Not specified"
                                                    }, void 0, false, {
                                                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                                        lineNumber: 189,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                                lineNumber: 187,
                                                columnNumber: 16
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between text-sm mt-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted-foreground",
                                                        children: "Availability:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                                        lineNumber: 192,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: playerCard.availability || "Not specified"
                                                    }, void 0, false, {
                                                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                                        lineNumber: 193,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                                lineNumber: 191,
                                                columnNumber: 16
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                        lineNumber: 186,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                lineNumber: 157,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                        lineNumber: 153,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this),
            "import ",
            FriendsList,
            ' from "@/components/friends/FriendsList"; // ...',
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FriendsList, {}, void 0, false, {
                fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                lineNumber: 205,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 md:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/tryouts",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                            className: "group cursor-pointer border-white/10 bg-gradient-to-br from-primary/10 to-transparent transition-all hover:border-primary/50",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "flex items-center justify-between p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-semibold text-primary group-hover:underline",
                                                children: "Browse Tryouts"
                                            }, void 0, false, {
                                                fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                                lineNumber: 213,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-muted-foreground",
                                                children: "Find teams looking for players like you."
                                            }, void 0, false, {
                                                fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                                lineNumber: 214,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                        lineNumber: 212,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$swords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Swords$3e$__["Swords"], {
                                        className: "h-8 w-8 text-primary opacity-50 transition-opacity group-hover:opacity-100"
                                    }, void 0, false, {
                                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                        lineNumber: 216,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                lineNumber: 211,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                            lineNumber: 210,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                        lineNumber: 209,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/applications",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                            className: "group cursor-pointer border-white/10 bg-gradient-to-br from-accent/10 to-transparent transition-all hover:border-accent/50",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "flex items-center justify-between p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-semibold text-accent group-hover:underline",
                                                children: "My Applications"
                                            }, void 0, false, {
                                                fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                                lineNumber: 224,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-muted-foreground",
                                                children: "Check the status of your applications."
                                            }, void 0, false, {
                                                fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                                lineNumber: 225,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                        lineNumber: 223,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute -right-1 -top-1 h-3 w-3 animate-ping rounded-full bg-accent opacity-50"
                                            }, void 0, false, {
                                                fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                                lineNumber: 228,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-3 w-3 rounded-full bg-accent"
                                            }, void 0, false, {
                                                fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                                lineNumber: 229,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                        lineNumber: 227,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                                lineNumber: 222,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                            lineNumber: 221,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                        lineNumber: 220,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
                lineNumber: 208,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, this);
}
_s(PlayerDashboard, "k+v4+iDzpk3NSXWpAGFIaYsPX2Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = PlayerDashboard;
var _c;
__turbopack_context__.k.register(_c, "PlayerDashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/rosterup-web/src/components/dashboard/TeamDashboard.tsx [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const e = new Error("Could not parse module '[project]/rosterup-web/src/components/dashboard/TeamDashboard.tsx'\n\nExpected '}', got '<eof>'");
e.code = 'MODULE_UNPARSABLE';
throw e;
}),
"[project]/rosterup-web/src/app/(dashboard)/dashboard/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$components$2f$dashboard$2f$PlayerDashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/src/components/dashboard/PlayerDashboard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$components$2f$dashboard$2f$TeamDashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/src/components/dashboard/TeamDashboard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/src/contexts/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function DashboardPage() {
    _s();
    const { user, profile, signOut, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const handleSignOut = async ()=>{
        await signOut();
        router.push("/login");
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center min-h-[400px]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-muted-foreground",
                children: "Loading..."
            }, void 0, false, {
                fileName: "[project]/rosterup-web/src/app/(dashboard)/dashboard/page.tsx",
                lineNumber: 21,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/rosterup-web/src/app/(dashboard)/dashboard/page.tsx",
            lineNumber: 20,
            columnNumber: 7
        }, this);
    }
    if (!user) {
        router.push("/login");
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-end",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "ghost",
                    size: "sm",
                    onClick: handleSignOut,
                    className: "text-muted-foreground hover:text-destructive",
                    children: "Sign Out"
                }, void 0, false, {
                    fileName: "[project]/rosterup-web/src/app/(dashboard)/dashboard/page.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/rosterup-web/src/app/(dashboard)/dashboard/page.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            profile?.user_type === "player" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$components$2f$dashboard$2f$PlayerDashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlayerDashboard"], {}, void 0, false, {
                fileName: "[project]/rosterup-web/src/app/(dashboard)/dashboard/page.tsx",
                lineNumber: 41,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$components$2f$dashboard$2f$TeamDashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TeamDashboard"], {}, void 0, false, {
                fileName: "[project]/rosterup-web/src/app/(dashboard)/dashboard/page.tsx",
                lineNumber: 43,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/rosterup-web/src/app/(dashboard)/dashboard/page.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_s(DashboardPage, "au20mMEecRK44U48jBev4KBvfz4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = DashboardPage;
var _c;
__turbopack_context__.k.register(_c, "DashboardPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/rosterup-web/node_modules/lucide-react/dist/esm/icons/crosshair.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Crosshair
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ],
    [
        "line",
        {
            x1: "22",
            x2: "18",
            y1: "12",
            y2: "12",
            key: "l9bcsi"
        }
    ],
    [
        "line",
        {
            x1: "6",
            x2: "2",
            y1: "12",
            y2: "12",
            key: "13hhkx"
        }
    ],
    [
        "line",
        {
            x1: "12",
            x2: "12",
            y1: "6",
            y2: "2",
            key: "10w3f3"
        }
    ],
    [
        "line",
        {
            x1: "12",
            x2: "12",
            y1: "22",
            y2: "18",
            key: "15g9kq"
        }
    ]
];
const Crosshair = (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("crosshair", __iconNode);
;
 //# sourceMappingURL=crosshair.js.map
}),
"[project]/rosterup-web/node_modules/lucide-react/dist/esm/icons/crosshair.js [app-client] (ecmascript) <export default as Crosshair>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Crosshair",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crosshair$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crosshair$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/node_modules/lucide-react/dist/esm/icons/crosshair.js [app-client] (ecmascript)");
}),
"[project]/rosterup-web/node_modules/lucide-react/dist/esm/icons/square-pen.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>SquarePen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",
            key: "1m0v6g"
        }
    ],
    [
        "path",
        {
            d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
            key: "ohrbg2"
        }
    ]
];
const SquarePen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("square-pen", __iconNode);
;
 //# sourceMappingURL=square-pen.js.map
}),
"[project]/rosterup-web/node_modules/lucide-react/dist/esm/icons/square-pen.js [app-client] (ecmascript) <export default as Edit>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Edit",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/node_modules/lucide-react/dist/esm/icons/square-pen.js [app-client] (ecmascript)");
}),
"[project]/rosterup-web/node_modules/lucide-react/dist/esm/icons/gamepad-2.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Gamepad2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "line",
        {
            x1: "6",
            x2: "10",
            y1: "11",
            y2: "11",
            key: "1gktln"
        }
    ],
    [
        "line",
        {
            x1: "8",
            x2: "8",
            y1: "9",
            y2: "13",
            key: "qnk9ow"
        }
    ],
    [
        "line",
        {
            x1: "15",
            x2: "15.01",
            y1: "12",
            y2: "12",
            key: "krot7o"
        }
    ],
    [
        "line",
        {
            x1: "18",
            x2: "18.01",
            y1: "10",
            y2: "10",
            key: "1lcuu1"
        }
    ],
    [
        "path",
        {
            d: "M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z",
            key: "mfqc10"
        }
    ]
];
const Gamepad2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("gamepad-2", __iconNode);
;
 //# sourceMappingURL=gamepad-2.js.map
}),
"[project]/rosterup-web/node_modules/lucide-react/dist/esm/icons/gamepad-2.js [app-client] (ecmascript) <export default as Gamepad2>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Gamepad2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gamepad$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gamepad$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/node_modules/lucide-react/dist/esm/icons/gamepad-2.js [app-client] (ecmascript)");
}),
"[project]/rosterup-web/node_modules/lucide-react/dist/esm/icons/instagram.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Instagram
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "rect",
        {
            width: "20",
            height: "20",
            x: "2",
            y: "2",
            rx: "5",
            ry: "5",
            key: "2e1cvw"
        }
    ],
    [
        "path",
        {
            d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z",
            key: "9exkf1"
        }
    ],
    [
        "line",
        {
            x1: "17.5",
            x2: "17.51",
            y1: "6.5",
            y2: "6.5",
            key: "r4j83e"
        }
    ]
];
const Instagram = (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("instagram", __iconNode);
;
 //# sourceMappingURL=instagram.js.map
}),
"[project]/rosterup-web/node_modules/lucide-react/dist/esm/icons/instagram.js [app-client] (ecmascript) <export default as Instagram>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Instagram",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/node_modules/lucide-react/dist/esm/icons/instagram.js [app-client] (ecmascript)");
}),
"[project]/rosterup-web/node_modules/lucide-react/dist/esm/icons/trophy.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Trophy
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978",
            key: "1n3hpd"
        }
    ],
    [
        "path",
        {
            d: "M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978",
            key: "rfe1zi"
        }
    ],
    [
        "path",
        {
            d: "M18 9h1.5a1 1 0 0 0 0-5H18",
            key: "7xy6bh"
        }
    ],
    [
        "path",
        {
            d: "M4 22h16",
            key: "57wxv0"
        }
    ],
    [
        "path",
        {
            d: "M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z",
            key: "1mhfuq"
        }
    ],
    [
        "path",
        {
            d: "M6 9H4.5a1 1 0 0 1 0-5H6",
            key: "tex48p"
        }
    ]
];
const Trophy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("trophy", __iconNode);
;
 //# sourceMappingURL=trophy.js.map
}),
"[project]/rosterup-web/node_modules/lucide-react/dist/esm/icons/trophy.js [app-client] (ecmascript) <export default as Trophy>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Trophy",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/node_modules/lucide-react/dist/esm/icons/trophy.js [app-client] (ecmascript)");
}),
"[project]/rosterup-web/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>User
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",
            key: "975kel"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "7",
            r: "4",
            key: "17ys0d"
        }
    ]
];
const User = (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("user", __iconNode);
;
 //# sourceMappingURL=user.js.map
}),
"[project]/rosterup-web/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "User",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript)");
}),
"[project]/rosterup-web/node_modules/lucide-react/dist/esm/icons/youtube.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Youtube
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17",
            key: "1q2vi4"
        }
    ],
    [
        "path",
        {
            d: "m10 15 5-3-5-3z",
            key: "1jp15x"
        }
    ]
];
const Youtube = (0, __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("youtube", __iconNode);
;
 //# sourceMappingURL=youtube.js.map
}),
"[project]/rosterup-web/node_modules/lucide-react/dist/esm/icons/youtube.js [app-client] (ecmascript) <export default as Youtube>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Youtube",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$youtube$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$rosterup$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$youtube$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/rosterup-web/node_modules/lucide-react/dist/esm/icons/youtube.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=rosterup-web_9475117a._.js.map