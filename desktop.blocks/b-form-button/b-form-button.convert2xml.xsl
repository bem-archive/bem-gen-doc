<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:x="http://www.yandex.ru/xscript"
    xmlns:lego="https://lego.yandex-team.ru"
    extension-element-prefixes=" x "
    exclude-result-prefixes=" x lego "
    version="1.0">

    <xsl:template match="lego:b-form-button">

        <lego:b-form-button>
            <xsl:copy-of select="@*"/>
            <xsl:copy-of select="lego:mix"/>

            <xsl:apply-templates select="." mode="lego:type-content"/>

            <lego:click/>

            <xsl:if test="@type">
                <lego:input type="{@type}"/>
            </xsl:if>
        </lego:b-form-button>

    </xsl:template>

    <xsl:template match="lego:b-form-button" mode="lego:type-content">
        <lego:left/>
        <lego:content>
            <lego:text>
                <xsl:apply-templates select="text() | node()[not(local-name() = 'mix')]"/>
            </lego:text>
        </lego:content>
    </xsl:template>

</xsl:stylesheet>
