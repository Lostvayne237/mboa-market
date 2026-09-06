# Future backlog — Platform admin

## Decision (2026-07-13)

“Manager” means **platform admin** (ops), not a vendor shop manager.

## MVP approach (now)

- Public roles: `buyer`, `vendor` only  
- Platform ops: Django **staff / superuser** via `python manage.py createsuperuser` and `/admin/`  
- Do **not** allow registering as manager via `/api/auth/register/`  

## Later sprint (after products exist)

Suggested story:

> As a platform admin, I want to verify vendors and moderate products/users so the marketplace stays trustworthy.

Possible work:

1. Optional `role=manager` on `User` (or keep using `is_staff` only)  
2. Permissions: list/hide products, activate/deactivate users, mark vendor verified  
3. Admin-only API routes **or** stick with Django admin until a custom admin UI is needed  

## Not doing yet

- Manager self-registration  
- Full custom admin SPA in Sprint 1  
