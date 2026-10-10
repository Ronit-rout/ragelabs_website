/**
 * Rage Labs Auth & Avatar Management Module
 */
function initAuth() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const authNav = document.getElementById('auth-nav');
    if (!authNav) return;

    if (!user) {
        authNav.innerHTML = "";
    } else {
        const initial = user.fullName ? user.fullName.charAt(0).toUpperCase() : (user.email ? user.email.charAt(0).toUpperCase() : 'U');

        authNav.innerHTML = `
            <div class="flex items-center gap-4">
                <div class="group relative">
                    <div class="w-10 h-10 rounded-full bg-primary text-white font-black flex items-center justify-center cursor-pointer shadow-lg shadow-primary/20 transition-transform active:scale-90">
                        ${initial}
                    </div>
                    <div class="absolute right-0 mt-2 w-48 bg-white dark:bg-background-dark rounded-xl shadow-2xl border border-primary/10 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[60]">
                        <div class="px-4 py-2 border-b border-primary/5 mb-1 text-left">
                            <p class="text-xs font-black text-gray-400 uppercase tracking-tighter">Connected as</p>
                            <p class="text-sm font-bold truncate">${user.fullName || user.email}</p>
                        </div>
                        <button onclick="logout()" class="w-full text-left px-4 py-2 text-sm font-bold text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 flex items-center gap-2">
                            <span class="material-symbols-outlined text-[18px]">logout</span>
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.reload();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuth);
} else {
    initAuth();
}
