<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:x="http://www.yandex.ru/xscript"
    xmlns:lego="https://lego.yandex-team.ru"
    exclude-result-prefixes=" x lego "
    version="1.0">

<xsl:template match="lego:b-form-button[@type]/lego:input">
    <input type="{@type}">
        <xsl:apply-templates select="." mode="lego:block-attributes"/>
        <xsl:if test="not(../@lego:type = 'simple')">
            <xsl:attribute name="hidefocus">true</xsl:attribute>
        </xsl:if>
        <xsl:if test="../@lego:disabled = 'yes'">
            <xsl:attribute name="disabled">disabled</xsl:attribute>
        </xsl:if>
        <xsl:if test="../@name">
            <xsl:attribute name="name">
                <xsl:value-of select="../@name"/>
            </xsl:attribute>
        </xsl:if>
        <xsl:attribute name="value">
            <xsl:apply-templates select="." mode="lego:b-form-button-value"/>
        </xsl:attribute>
        <xsl:apply-templates select="parent::lego:b-form-button" mode="counter"/>
        <!--xsl:apply-templates select="." mode="lego:wai"/-->
    </input>
</xsl:template>

<xsl:template match="lego:b-form-button[@type and @value]/lego:input" mode="lego:b-form-button-value">
    <xsl:value-of select="../@value"/>
</xsl:template>

<xsl:template match="lego:b-form-button[@type]/lego:input" mode="lego:wai">
    <xsl:attribute name="tabindex">-1</xsl:attribute>
</xsl:template>

</xsl:stylesheet>
