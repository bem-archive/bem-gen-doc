<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:x="http://www.yandex.ru/xscript"
    xmlns:lego="https://lego.yandex-team.ru"
    xmlns:math="http://exslt.org/math"
    exclude-result-prefixes=" x lego "
    extension-element-prefixes=" math "
    version="1.0">

<xsl:strip-space elements="lego:b-form-button"/>

<xsl:template match="lego:b-form-button">
    <xsl:element name="{x:if(@url, 'a', 'span')}">
        <xsl:apply-templates select="." mode="lego:url"/>
        <xsl:apply-templates select="." mode="lego:js-params"/>
        <xsl:copy-of select="@target | @id | @tabindex"/>
        <xsl:apply-templates select="." mode="lego:block-attributes"/>
        <xsl:apply-templates select="." mode="lego:content"/>
    </xsl:element>
</xsl:template>

<!-- LEGO-6656 - b-form-button: Счётчики аналогично с b-link -->
<xsl:template match="lego:b-form-button[lego:click]" mode="lego:block-attributes">
    <xsl:apply-imports/>
    <xsl:apply-templates select="." mode="counter"/>
</xsl:template>

<xsl:template match="lego:b-form-button" mode="counter">
    <xsl:choose>
        <xsl:when test="@show-counter">
            <xsl:apply-templates select="." mode="lego:counter">
                <xsl:with-param name="show-counter" select="floor(math:random() * 100) &lt;= @show-counter"/>
            </xsl:apply-templates>
        </xsl:when>
        <xsl:otherwise>
            <xsl:apply-templates select="." mode="lego:counter"/>
        </xsl:otherwise>
    </xsl:choose>
</xsl:template>

<!-- ##################################################################### -->

<xsl:template match="lego:b-form-button" mode="lego:block-class-content">
    <xsl:apply-imports/>
    <xsl:text> i-bem</xsl:text>
</xsl:template>

<xsl:template match="lego:b-form-button" mode="lego:wai">
    <xsl:attribute name="role">button</xsl:attribute>
    <!--xsl:attribute name="tabindex">0</xsl:attribute-->
    <xsl:if test="@lego:disabled = 'yes'">
        <xsl:attribute name="aria-disabled">true</xsl:attribute>
    </xsl:if>
</xsl:template>

<xsl:template match="lego:b-form-button/lego:left">
    <i>
        <xsl:apply-templates select="." mode="lego:block-attributes"/>
    </i>
</xsl:template>

<xsl:template match="lego:b-form-button/lego:content | lego:b-form-button//lego:text">
    <span>
        <xsl:apply-templates select="." mode="lego:block-attributes"/>
        <xsl:apply-templates select="." mode="lego:content"/>
    </span>
</xsl:template>

</xsl:stylesheet>
