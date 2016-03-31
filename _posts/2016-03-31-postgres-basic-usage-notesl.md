---
layout:     post
title:      "Postgresql Basic Usage Notes"
subtitle:   ""
date:       2016-03-31
author:     "zhulinpinyu"
header-img:
tags:
    - Nodejs
    - NPM
---

## Postgresql Basic Usage Notes

![/img/in-post/2016-03-31-postgresql-logo.png](/img/in-post/2016-03-31-postgresql-logo.png)


### Basic usage

**Login**

```sql
psql -h 0.0.0.0 -U username -p 5432
```

**show DB**

```sql
\l
```

**switch DB**

```sql
\c db_name
```

**show tables in DB**

```sql
\dt
```

> use `\?`  see more detail

**show view in DB**

```sql
\dv
```

**Show view detail with create shell**

```sql
 \d+ view_name
```

### SQL usage

**split one field value to multi field**

```sql
split_part 示例:
split_part(lgl_category, '-',1)
split_part(lgl_category, '-‘,3)

示例：
SELECT *,upper(split_part(lgl_category, '-',1)) as vtype, upper(split_part(lgl_category, '-',3)) as vsubtype FROM lg.venuesview_3857
```

> lgl_category is field name

**Uppercase method**

```sql
upper:字段值转换为大写
```

**concat multi field to one field**

```sql
select lgl_category,concat(lgl_description,'(',lgl_description_eng,')') from lg.category_raw
```

> `lgl_description` and  `lgl_description_eng` are field name
