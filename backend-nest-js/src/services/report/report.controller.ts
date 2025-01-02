import { Controller, Get, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { ReportService } from './report.service';

@Controller('/api/v1/report/')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Get()
  async getFile(): Promise<StreamableFile> {
    await this.reportService.getReport();

    const file = createReadStream(join(process.cwd(), 'report.xlsx'));

    const date = new Date().toLocaleDateString('ru-RU');

    return new StreamableFile(file, {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      disposition: `attachment; filename="report ${date}.xlsx"`,
    });
  }
}
