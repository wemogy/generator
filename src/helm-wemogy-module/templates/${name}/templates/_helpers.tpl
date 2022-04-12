{{- define "config-content" -}}
{{- if typeIs "string" .Values.config.content }}
{{ .Values.config.content }}
{{- else}}
{{ .Values.config.content | toYaml }}
{{- end }}
{{- end }}

# Docker Login Credentials for wemoy Image Pull Secret
{{- define "wemogy<%= name.pascalCase %>DockerLogin" -}}
{{- .Values.images.wemogy.pullSecret.username }}:{{ .Values.images.wemogy.pullSecret.password }}
{{- end }}

{{- define "wemogy<%= name.pascalCase %>DockerLoginPullSecretContent" -}}
{
  "auths": {
    "https://wemogycloudacr.azurecr.io": {
        "auth": "{{ include "wemogy<%= name.pascalCase %>DockerLogin" . | b64enc }}"
    }
  }
}
{{- end }}
