create table "public"."keys_stuff" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "public" text,
    "private" text,
    "username" text
);


CREATE UNIQUE INDEX keys_stuff_pkey ON public.keys_stuff USING btree (id);

alter table "public"."keys_stuff" add constraint "keys_stuff_pkey" PRIMARY KEY using index "keys_stuff_pkey";

grant delete on table "public"."keys_stuff" to "anon";

grant insert on table "public"."keys_stuff" to "anon";

grant references on table "public"."keys_stuff" to "anon";

grant select on table "public"."keys_stuff" to "anon";

grant trigger on table "public"."keys_stuff" to "anon";

grant truncate on table "public"."keys_stuff" to "anon";

grant update on table "public"."keys_stuff" to "anon";

grant delete on table "public"."keys_stuff" to "authenticated";

grant insert on table "public"."keys_stuff" to "authenticated";

grant references on table "public"."keys_stuff" to "authenticated";

grant select on table "public"."keys_stuff" to "authenticated";

grant trigger on table "public"."keys_stuff" to "authenticated";

grant truncate on table "public"."keys_stuff" to "authenticated";

grant update on table "public"."keys_stuff" to "authenticated";

grant delete on table "public"."keys_stuff" to "service_role";

grant insert on table "public"."keys_stuff" to "service_role";

grant references on table "public"."keys_stuff" to "service_role";

grant select on table "public"."keys_stuff" to "service_role";

grant trigger on table "public"."keys_stuff" to "service_role";

grant truncate on table "public"."keys_stuff" to "service_role";

grant update on table "public"."keys_stuff" to "service_role";


