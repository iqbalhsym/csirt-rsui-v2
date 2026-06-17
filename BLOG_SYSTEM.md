# Blog System Documentation

Sistem blog lengkap menggunakan Filament v4 di Laravel.

## Struktur Database

### Tabel: posts
- `id` - Primary key
- `title` - Judul post (string)
- `slug` - URL-friendly slug (string unique)
- `thumbnail` - Path gambar thumbnail (string nullable)
- `content` - Konten post (longText)
- `published_at` - Tanggal publish (timestamp nullable)
- `likes_count` - Jumlah likes (integer default 0)
- `dislikes_count` - Jumlah dislikes (integer default 0)
- `timestamps` - created_at & updated_at

## Model: Post

**Location**: `app/Models/Post.php`

### Features:
- ✅ Mass assignable fields
- ✅ Auto-cast `published_at` ke datetime
- ✅ Accessor `thumbnail_url` untuk mendapatkan URL lengkap thumbnail
- ✅ Scope `published()` untuk mendapatkan post yang sudah publish
- ✅ Scope `draft()` untuk mendapatkan post draft
- ✅ Factory support untuk testing dan seeding

### Usage Example:

```php
// Get published posts
$posts = Post::published()->get();

// Get draft posts
$drafts = Post::draft()->get();

// Get thumbnail URL
$post = Post::find(1);
echo $post->thumbnail_url;
```

## Filament Resource: PostResource

**Location**: `app/Filament/Resources/Posts/`

### Form Features (PostForm):

1. **Post Information Section**:
   - **Title**: Required, dengan auto-generate slug saat create
   - **Slug**: Required, unique, validasi alpha_dash
   - **Thumbnail**: 
     - FileUpload component
     - Disk: public
     - Directory: thumbnails
     - Max size: 2MB
     - Dengan image editor
     - Aspect ratios: 16:9, 4:3, 1:1
   - **Content**: 
     - RichEditor dengan fitur upload gambar
     - Upload ke: posts/attachments
     - Disk: public
   - **Published At**: 
     - DateTimePicker
     - Format: d/m/Y H:i
     - Kosong = draft
     - Future date = scheduled

2. **Statistics Section** (hidden saat create):
   - Likes count (readonly)
   - Dislikes count (readonly)
   - Created at
   - Updated at

### Table Features (PostsTable):

**Columns**:
- Thumbnail (image, 60x60)
- Title (searchable, sortable, dengan preview content)
- Slug (searchable, hidden by default)
- Published (dengan badge status: Draft/Scheduled/Published)
- Likes count (dengan icon thumb up, success color)
- Dislikes count (dengan icon thumb down, danger color)
- Created at & Updated at (toggleable, hidden by default)

**Filters**:
1. **Status Filter**:
   - Published: Post yang sudah publish
   - Scheduled: Post yang dijadwalkan
   - Draft: Post yang belum publish

2. **Date Range Filter**:
   - Published From
   - Published Until

**Bulk Actions**:
- Delete selected
- Publish selected
- Unpublish selected

**Default Sorting**: Created at descending

## File Structure

```
app/
├── Models/
│   └── Post.php
├── Filament/
│   └── Resources/
│       └── Posts/
│           ├── PostResource.php
│           ├── Pages/
│           │   ├── CreatePost.php
│           │   ├── EditPost.php
│           │   ├── ListPosts.php
│           │   └── ViewPost.php
│           ├── Schemas/
│           │   ├── PostForm.php
│           │   └── PostInfolist.php
│           └── Tables/
│               └── PostsTable.php
database/
├── migrations/
│   └── 2025_10_23_000000_create_posts_table.php
├── factories/
│   └── PostFactory.php
└── seeders/
    └── PostSeeder.php
```

## Commands

### Migration
```bash
php artisan migrate
```

### Seeding (Optional)
```bash
# Seed dengan data dummy
php artisan db:seed --class=PostSeeder
```

### Factory Usage
```php
// Create 10 published posts
Post::factory()->published()->count(10)->create();

// Create 5 draft posts
Post::factory()->draft()->count(5)->create();

// Create 3 scheduled posts
Post::factory()->scheduled()->count(3)->create();
```

## Access

1. Login ke Filament admin panel: `/admin`
2. Navigate ke menu "Posts"
3. CRUD operations tersedia dengan UI yang lengkap

## Storage Configuration

Pastikan symbolic link untuk storage sudah dibuat:
```bash
php artisan storage:link
```

## Best Practices

1. **Images**: Gunakan image editor untuk crop/resize thumbnail sebelum upload
2. **Content**: Gunakan RichEditor untuk formatting yang baik
3. **Publishing**: 
   - Kosongkan published_at untuk draft
   - Set tanggal masa depan untuk scheduling
   - Set tanggal sekarang atau masa lalu untuk publish langsung
4. **Slug**: Akan auto-generate dari title saat create, bisa diedit manual jika perlu

## Notes

- Sistem menggunakan Filament v4 dengan struktur baru (Schemas & Tables)
- Likes dan dislikes count hanya untuk display, belum ada sistem untuk increment
- Thumbnail disimpan di `storage/app/public/thumbnails/`
- Attachment content disimpan di `storage/app/public/posts/attachments/`
