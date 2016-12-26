<!DOCTYPE html>
<!--[if lt IE 7]><html lang="en" class="no-js lt-ie9 lt-ie8 lt-ie7"><![endif]-->
<!--[if IE 7]><html lang="en" class="no-js lt-ie9 lt-ie8"><![endif]-->
<!--[if IE 8]><html lang="en" class="no-js lt-ie9"><![endif]-->
<!--[if gt IE 8]><!--><html xml:lang="en" lang="en" class="no-js"><!--<![endif]-->
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${content.title!'Frog Rain'}</title>
  <meta name="robots" content="noindex, nofollow" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />

  [#assign site = sitefn.site()!]
  [#assign theme = sitefn.theme(site)!]

  [#list theme.cssFiles as cssFile]
      <link rel="stylesheet" href="${cssFile.link}" media="${cssFile.media}" />
  [/#list]

  [#if cmsfn.editMode]
    [#-- Stylesheet for edit mode if necessary --]
  [/#if]

  <script data-main="/.resources/frog-rain-ui-module/webresources/js/main" src="${ctx.contextPath}/.resources/frog-rain-ui-module/webresources/js/vendor/require.js"></script>

  [@cms.page /]
</head>