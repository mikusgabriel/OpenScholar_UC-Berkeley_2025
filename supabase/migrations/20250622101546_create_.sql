alter table "public"."keys_stuff" alter column "username" set data type uuid using "username"::uuid;

CREATE UNIQUE INDEX keys_stuff_user_key ON public.keys_stuff USING btree (username);

alter table "public"."keys_stuff" add constraint "keys_stuff_user_key" UNIQUE using index "keys_stuff_user_key";


