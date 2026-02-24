# Curriculum Videos

Videos are organized by **units**. Each unit has its own folder.

## Folder structure

- `unit-1/` — Unit 1 (e.g. Place Value)
- `unit-2/` — Unit 2 (e.g. Addition & Subtraction)
- `unit-3/` through `unit-8/`

## Naming videos in each unit

Use **number, then a dash, then the title** so the app knows the order and can show the title in the UI:

- **1-Title here.mp4** — first lesson; “Title here” is shown as the video title in the app  
- **2-Another lesson.mp4** — second lesson  
- **3-.mp4** — third lesson (no title after the dash; the app will use the lesson title from the curriculum)  
- … up to **8-Something.mp4** if the unit has 8 lessons  

**Rule:** `{number}-{whatever comes after the dash}.mp4`  
- The **number** (1, 2, 3, …) is the lesson order.  
- **Whatever comes after the dash** is used as the video title in the app. If it’s empty (e.g. `2-.mp4`), the app falls back to the lesson title from the curriculum.

## Example (Grade 4, Unit 1 – Place Value)

In `unit-1/` you might have:

- `1-Place value blocks.mp4`
- `2-Reading big numbers.mp4`
- `3-Writing numbers.mp4`
- `4-Comparing numbers.mp4`
- `5-Rounding numbers.mp4`

Supported formats: `.mp4`, `.webm`, `.mov` (`.mp4` recommended for web).
