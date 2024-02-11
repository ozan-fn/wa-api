# API Panduan

## Endpoint: POST /send-message

Endpoint ini digunakan untuk mengirim pesan teks melalui API.

### Request Body

Berikut adalah struktur dari request body:

```json
{
    "phoneNumber": "<nomor_telepon_tujuan>",
    "text": "<pesan_teks>"
}
```
