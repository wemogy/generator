{{- define "config-content" -}}
{{- if typeIs "string" .Values.config.content }}
{{ .Values.config.content }}
{{- else}}
{{ .Values.config.content | toYaml }}
{{- end }}
{{- end }}
