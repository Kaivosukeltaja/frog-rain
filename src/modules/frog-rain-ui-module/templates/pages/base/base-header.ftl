<!DOCTYPE html>
<!--[if lt IE 7]><html lang="en" class="no-js lt-ie9 lt-ie8 lt-ie7"><![endif]-->
<!--[if IE 7]><html lang="en" class="no-js lt-ie9 lt-ie8"><![endif]-->
<!--[if IE 8]><html lang="en" class="no-js lt-ie9"><![endif]-->
<!--[if gt IE 8]><!--><html xml:lang="en" lang="en" class="no-js"><!--<![endif]-->
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${content.title!'Frog Rain kicks ass'}</title>
  <meta name="robots" content="noindex, nofollow" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />

  [#assign site = sitefn.site()!]
  [#assign theme = sitefn.theme(site)!]

  <!-- Styles defined in your site go here -->
  [#list theme.cssFiles as cssFile]
      <link rel="stylesheet" href="${cssFile.link}" media="${cssFile.media}" />
  [/#list]

  <!-- Link our demonstration CSS directly -->
  <link rel="stylesheet" href="${ctx.contextPath}/.resources/%MODULE_NAME%/webresources/css/styles.css" />

  [#if cmsfn.editMode]
    [#-- Stylesheet for edit mode if necessary --]
  [/#if]

  <script>
    // Pass any Magnolia specific properties to JS here
    window.magnolia = {
      contextPath: '${ctx.contextPath}',
    };
  </script>

  <script data-main="${ctx.contextPath}/.resources/%MODULE_NAME%/webresources/js/main" src="${ctx.contextPath}/.resources/%MODULE_NAME%/webresources/js/vendor/require.js"></script>

  [@cms.page /]
</head>
