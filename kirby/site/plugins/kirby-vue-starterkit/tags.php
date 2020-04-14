<?php

/**
 * Add data-id attribute to image tags found in kirbytext.
 * Taken from https://getkirby.com/docs/cookbook/extensions/extending-kirbytags
 */
$originalTag = Kirby\Text\KirbyTag::$types['image'];
return [
    'image' => [
        'attr' => $originalTag['attr'],

        'html' => function($tag) use ($originalTag)  {

            $file = $tag->file($tag->value());
            $result = $originalTag['html']($tag);

            $pattern = '/<img.*?>/i';

            // build a new image tag with the data-id attribute
            $image = Html::img($tag->src, [
                'width'  => $tag->width,
                'height' => $tag->height,
                'class'  => $tag->imgclass,
                'title'  => $tag->title,
                'alt'    => $tag->alt ?? ' ',
                'data-id' => $file->id()
            ]);

            // replace the old image tag
            $result = preg_replace($pattern, $image , $result);

            return $result;
        }
    ]
];