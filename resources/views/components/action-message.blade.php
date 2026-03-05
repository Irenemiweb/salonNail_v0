@props(['on'])

<div {{ $attributes->merge(['class' => 'text-sm text-gray-600']) }}
     x-data="{ shown: false, timeout: null }"
     x-on:{{ $on }}.window="
        clearTimeout(timeout);
        shown = true;
        timeout = setTimeout(() => { shown = false }, 4000);
     "
     x-show.transition.opacity.out.duration.1500ms="shown"
>
    {{ $slot }}
</div>
