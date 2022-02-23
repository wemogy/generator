
# Ingress routes
{{- define "<%= service %>Url" -}}
<%= service %>.{{ .Values.ingress.domain.prefix }}{{ if ne .Values.ingress.domain.prefix "" }}.{{ end }}{{ .Values.ingress.domain.core }}
{{- end }}

# Docker Login Credentials for wemoy Image Pull Secret
{{- define "wemogyDockerLogin" -}}
{{- .Values.wemogy.pullSecret.username }}:{{ .Values.wemogy.pullSecret.password }}
{{- end }}

{{- define "wemogyDockerLoginPullSecretContent" -}}
{
  "auths": {
    "https://wemogycloudacr.azurecr.io": {
        "auth": "{{ include "wemogyDockerLogin" . | b64enc }}"
    }
  }
}
{{- end }}
