/**
 * Rage Labs Toast Notification Module
 */
function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const icon = type === 'success' ? 'check_circle' : 'error';
    const colorClass = type === 'success' ? 'text-green-500' : 'text-indigo-500';

    toast.className = `glass-card flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border-l-4 ${type === 'success' ? 'border-l-green-500' : 'border-l-indigo-500'} animate-fade-left transition-all duration-300`;
    toast.innerHTML = `
        <span class="material-symbols-outlined ${colorClass}">${icon}</span>
        <span class="text-sm font-bold">${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-x-10');
        setTimeout(() => toast.remove(), 300);
    }, 4500);
}
